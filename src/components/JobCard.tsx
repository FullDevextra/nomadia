import { MapPin, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  title: string;
  description: string;
  rate: string;
  location: string;
  status: string;
}

const JobCard = ({ title, description, rate, location, status }: JobCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <h3 className="font-heading font-semibold text-xl text-foreground">{title}</h3>
          <Badge variant={status === "Open" ? "default" : "secondary"} className="bg-accent text-accent-foreground">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">{description}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>{rate}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Training Provided</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
