import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DestinationCardProps {
  image: string;
  city: string;
  country: string;
  description: string;
  flag?: string;
}

const DestinationCard = ({ image, city, country, description, flag }: DestinationCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={`${city}, ${country}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-heading font-bold text-2xl flex items-center gap-2">
            {city} {flag && <span className="text-3xl">{flag}</span>}
          </h3>
          <p className="text-sm opacity-90">{country}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-secondary">
          Explore More
          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
