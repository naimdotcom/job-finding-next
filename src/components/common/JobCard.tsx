import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Job } from "@/types/job";
import { fromNow } from "@/lib/moment";
import { Bookmark } from "lucide-react";

type props = Job;

export function JobCard({
  _id,
  company,
  title,
  location,
  requirements,
  startingSalary,
  endingSalary,
  createdAt,
}: props) {
  return (
    <Card className="w-full h-fit" key={_id}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarFallback>{title[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">
              {title[0].toUpperCase() + title.slice(1)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {company.name} • {location}
            </p>
          </div>
        </div>
        <div>
          <Bookmark />
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-green-600">
            Match with your profile
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {requirements.map((requirement) => (
            <Badge key={requirement} variant="outline">
              {requirement[0].toUpperCase() + requirement.slice(1)}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{fromNow(createdAt.toString())}</span>
          <span className="font-medium w-fit">
            ${startingSalary}k/m{endingSalary ? ` - ${endingSalary}k/m` : ""}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
