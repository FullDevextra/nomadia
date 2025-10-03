import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type JobApplication = {
  id: string;
  created_at?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  position?: string;
  resume_url?: string | null;
};

type ApplicantProfile = {
  id: string;
  created_at?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  ssn?: string ;
  profile_pic_url?: string | null;
  id_card_url?: string | null;
  resume_url?: string | null;
  education?: string | null;
  experience?: string | null;
  father_name?: string | null;
  mother_name?: string | null;
};

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [applicantProfiles, setApplicantProfiles] = useState<ApplicantProfile[]>([]);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ApplicantProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data: jobsData } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: profilesData } = await supabase
        .from("applicant_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      setJobApplications(jobsData || []);
      setApplicantProfiles(profilesData || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const filterRows = <T extends JobApplication | ApplicantProfile>(rows: T[]) => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter((r: any) =>
      Object.values(r).join(" ").toLowerCase().includes(q)
    );
  };

  const openJobDialog = (job: JobApplication) => {
    setSelectedJob(job);
    setSelectedProfile(null);
    setDialogTitle("Job Application Details");
    setDialogOpen(true);
  };

  const openProfileDialog = (profile: ApplicantProfile) => {
    setSelectedProfile(profile);
    setSelectedJob(null);
    setDialogTitle("Applicant Profile Details");
    setDialogOpen(true);
  };

  const openFile = (urlOrPath?: string | null) => {
    if (!urlOrPath) return toast.error("No file URL available.");
    if (urlOrPath.startsWith("http")) return window.open(urlOrPath, "_blank");
    try {
      const publicUrl = supabase.storage
        .from("applications")
        .getPublicUrl(urlOrPath).data.publicUrl;
      window.open(publicUrl, "_blank");
    } catch {
      toast.error("Unable to open file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navigation /> */}

      <main className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Input
            placeholder="Search applicants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <div className="flex gap-2">
            <Button onClick={fetchAll} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("URL copied");
              }}
              variant="outline"
            >
              Copy URL
            </Button>
          </div>
        </div>

        {/* Job Applications */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">
            Job Applications ({jobApplications.length})
          </h3>
          <div className="grid gap-4">
            {filterRows(jobApplications).map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {job.first_name} {job.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {job.email} • {job.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Position: {job.position || "—"}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => openJobDialog(job)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
            {filterRows(jobApplications).length === 0 && (
              <p className="text-sm text-gray-500">No job applications found.</p>
            )}
          </div>
        </section>

        {/* Applicant Profiles */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">
            Applicant Profiles ({applicantProfiles.length})
          </h3>
          <div className="grid gap-4">
            {filterRows(applicantProfiles).map((p) => (
              <Card
                key={p.id}
                className="hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {p.first_name} {p.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {p.email} • {p.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Education: {p.education || "—"}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => openProfileDialog(p)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
            {filterRows(applicantProfiles).length === 0 && (
              <p className="text-sm text-gray-500">No profiles found.</p>
            )}
          </div>
        </section>
      </main>

      {/* <Footer /> */}

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {/* Job Dialog */}
            {selectedJob && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedJob.first_name} {selectedJob.last_name}</p>
                <p><strong>Email:</strong> {selectedJob.email}</p>
                <p><strong>Phone:</strong> {selectedJob.phone}</p>
                <p><strong>Address:</strong> {selectedJob.address}</p>
                <p><strong>Position:</strong> {selectedJob.position}</p>
                {selectedJob.resume_url && (
                  <Button onClick={() => openFile(selectedJob.resume_url)}>Open Resume</Button>
                )}
              </div>
            )}

            {/* Profile Dialog */}
            {selectedProfile && (
              <div className="space-y-3">
                <p className="text-lg font-semibold">
                  {selectedProfile.first_name} {selectedProfile.last_name}
                </p>
                <p><strong>Email:</strong> {selectedProfile.email}</p>
                <p><strong>Phone:</strong> {selectedProfile.phone}</p>
                <p><strong>Address:</strong> {selectedProfile.address}</p>
                <p><strong>Education:</strong> {selectedProfile.education}</p>
                <p><strong>Experience:</strong> {selectedProfile.experience}</p>
                <p><strong>SSN:</strong> {selectedProfile.ssn}</p>


                <div className="pt-2 border-t">
                  <p className="font-medium mb-2">Documents</p>
                  <div className="flex gap-3">
                    {selectedProfile.resume_url && (
                      <Button onClick={() => openFile(selectedProfile.resume_url)}>
                        View Resume
                      </Button>
                    )}
                    {selectedProfile.id_card_url && (
                      <Button onClick={() => openFile(selectedProfile.id_card_url)}>
                        View ID
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
