import { useState , useRef, useEffect} from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import heroImage from "@/assets/jobs-hero.jpg";
import Hero from "@/components/Hero";
import { supabase } from "@/integrations/supabase/client";


const ProfileSetup = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    ssn: "",
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    education: "",
    experience: "",
  });

  const [files, setFiles] = useState({
    profilePic: null as File | null,
    idCard: null as File | null,
    resume: null as File | null,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileName = `${folder}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from("applications").upload(fileName, file);

    if (error) {
      console.error("File upload failed:", error);
      throw new Error("File upload failed");
    }

    const { data: publicUrlData } = supabase.storage.from("applications").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePicUrl = null;
      let idCardUrl = null;
      let resumeUrl = null;

      // ✅ Upload each file if it exists
      if (files.profilePic)
        profilePicUrl = await uploadFile(files.profilePic, "profile_pics");
      if (files.idCard)
        idCardUrl = await uploadFile(files.idCard, "idcards");
      if (files.resume)
        resumeUrl = await uploadFile(files.resume, "resumes");

      // ✅ Insert applicant data into Supabase
      const { error } = await supabase.from("applicant_profiles").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          ssn: formData.ssn,
          father_name: formData.fatherName,
          father_occupation: formData.fatherOccupation,
          father_phone: formData.fatherPhone,
          mother_name: formData.motherName,
          mother_occupation: formData.motherOccupation,
          mother_phone: formData.motherPhone,
          education: formData.education,
          experience: formData.experience,
          id_card_url: idCardUrl,
          resume_url: resumeUrl,
          profile_pic_url: profilePicUrl,
        },
      ]);

      if (error) throw error;

      // ✅ Notify success
      toast.success("✅ Profile submitted successfully! You’ll be contacted soon.");

      // 📨 Trigger Supabase Edge Function (Send Admin Email)
      const emailResponse = await fetch(
        "https://obiedxhlppfiipyynubm.supabase.co/functions/v1/send-admin-email",
        {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
           },
          body: JSON.stringify({
            applicant: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              id_card_url: idCardUrl,
              resume_url: resumeUrl,
            },
          }),
        }
      );

      if (!emailResponse.ok) {
        console.warn("⚠️ Email notification failed:", await emailResponse.text());
      }

      // ✅ Reset form & files
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        ssn: "",
        fatherName: "",
        fatherOccupation: "",
        fatherPhone: "",
        motherName: "",
        motherOccupation: "",
        motherPhone: "",
        education: "",
        experience: "",
      });
      setFiles({ profilePic: null, idCard: null, resume: null });

    } catch (err: any) {
      console.error("❌ Submission Error:", err);
      toast.error("❌ Failed to submit profile. Try again.");
    } finally {
      setLoading(false);
    }
  };


  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // 📸 Start Camera Stream
  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access denied:", err);
          toast.error("Camera access denied. Please allow camera permission.");
          setShowCamera(false);
        });
    }
  }, [showCamera]);

  // 🛑 Stop Camera Stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  // 📸 Capture Selfie from Video
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);

    stopCamera();
  };

  // ☁️ Upload Captured Image (base64 → File)
  const handleCapturedImageUpload = async (dataUrl: string) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], `selfie_${Date.now()}.jpg`, { type: "image/jpeg" });

    handleFileChange("profilePic", file);
    toast.success("Selfie selected!");
  };



  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <Hero
        title="Complete Your Profile"
        subtitle="Fill out your details accurately. This information will be used to verify your identity and eligibility for roles at GlobeExtra Travel Co."
        backgroundImage={heroImage}
        height="small"
      />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl">
            <CardContent className="p-8 space-y-10">
              
              <div className="text-center">
                <h2 className="font-heading font-bold text-3xl mb-4">Profile Setup Form</h2>
                <p className="text-muted-foreground">
                  Please ensure all information is correct. False details may lead to disqualification.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* 📸 Profile Picture */}
                <section>
                  <h3 className="font-semibold text-lg mb-4">Profile Picture</h3>
                  
                  <div className="flex flex-col items-center gap-4">
                    <Label htmlFor="profilePic">
                      Upload a clear photo (3MB max, jpeg, png, jpg format) *
                    </Label>
                    
                    {/* ✅ File Upload Option */}
                    <Input
                      id="profilePic"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange("profilePic", e.target.files?.[0] || null)
                      }
                    />

                    {/* ✅ Divider */}
                    <div className="flex items-center w-full justify-center gap-2 text-gray-500 text-sm">
                      <div className="w-1/4 border-t"></div>
                      <span>or</span>
                      <div className="w-1/4 border-t"></div>
                    </div>

                    {/* ✅ Take Selfie Option */}
                    {!capturedImage ? (
                      <Button
                        type="button"
                        onClick={() => setShowCamera(true)}
                        variant="outline"
                      >
                        📸 Take a Selfie
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={capturedImage}
                          alt="Captured Selfie"
                          className="w-32 h-32 object-cover rounded-full border"
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => setCapturedImage(null)}
                            variant="outline"
                            size="sm"
                          >
                            Retake
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleCapturedImageUpload(capturedImage)}
                          >
                            Use Photo
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* ✅ Camera Modal */}
                    {showCamera && (
                      <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-64 h-64 object-cover rounded-lg border-2 border-white"
                        ></video>

                        <div className="flex gap-4 mt-4">
                          <Button type="button" onClick={captureImage}>
                            📷 Capture
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={stopCamera}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>



                {/* 👤 Personal Info */}
                <section>
                  <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>First Name *</Label><Input value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required /></div>
                    <div><Label>Last Name *</Label><Input value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} required /></div>
                    <div><Label>Email *</Label><Input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required /></div>
                    <div><Label>Phone *</Label><Input type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required /></div>
                    <div><Label>Address *</Label><Input value={formData.address} onChange={(e) => handleChange("address", e.target.value)} required /></div>
                    <div><Label>SSN *</Label><Input value={formData.ssn} onChange={(e) => handleChange("ssn", e.target.value)} required /></div>
                  </div>
                </section>

                {/* 🧾 Documents */}
                <section>
                  <h3 className="font-semibold text-lg mb-4">Document Uploads</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>ID Card *</Label><Input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("idCard", e.target.files?.[0] || null)} required /></div>
                    {/* <div><Label>Resume *</Label><Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange("resume", e.target.files?.[0] || null)} required /></div> */}
                  </div>
                </section>

                {/* 👨‍👩‍👧 Guardian Info */}
                <section>
                  <h3 className="font-semibold text-lg mb-4">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Father’s Name</Label><Input value={formData.fatherName} onChange={(e) => handleChange("fatherName", e.target.value)} /></div>
                    {/* <div><Label>Father’s Occupation</Label><Input value={formData.fatherOccupation} onChange={(e) => handleChange("fatherOccupation", e.target.value)} /></div> */}
                    {/* <div><Label>Father’s Phone</Label><Input type="tel" value={formData.fatherPhone} onChange={(e) => handleChange("fatherPhone", e.target.value)} /></div> */}
                    <div><Label>Mother’s Name</Label><Input value={formData.motherName} onChange={(e) => handleChange("motherName", e.target.value)} /></div>
                    {/* <div><Label>Mother’s Occupation</Label><Input value={formData.motherOccupation} onChange={(e) => handleChange("motherOccupation", e.target.value)} /></div> */}
                    <div><Label>Any Guardian Contact (Father/Mother)</Label><Input type="tel" value={formData.motherPhone} onChange={(e) => handleChange("motherPhone", e.target.value)} /></div>
                  </div>
                </section>

                {/* 🎓 Education */}
                {/* <section>
                  <h3 className="font-semibold text-lg mb-4">Education & Work Experience</h3>
                  <div className="space-y-4">
                    <div><Label>Education Background</Label><Input value={formData.education} onChange={(e) => handleChange("education", e.target.value)} placeholder="e.g., B.Sc. in Tourism Management" /></div>
                    <div><Label>Work Experience</Label><Input value={formData.experience} onChange={(e) => handleChange("experience", e.target.value)} placeholder="e.g., 3 years in Travel Consultancy" /></div>
                  </div>
                </section> */}

                {/* ✅ Terms */}
                <section>
                  <div className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <a href="terms" className="underline text-primary">Terms and Conditions</a>.
                  </div>
                </section>

                <Button
                  type="submit"
                  className="w-full mt-4 bg-primary hover:bg-secondary text-primary-foreground"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Profile"}
                </Button>

              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfileSetup;
