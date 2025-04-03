import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Job } from "@/types/job";
import { fromNow } from "@/lib/moment";

type props = Job;

export function JobCard({
  id,
  company,
  title,
  location,
  requirements,
  startingSalary,
  endingSalary,
  jobType,
  expireAt,
  createdAt,
  description,
  updatedAt,
  postedBy,
}: props) {
  return (
    <Card className="w-full h-fit">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {company} • {location}
          </p>
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
              {requirement}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{fromNow(createdAt.toString())} • 140 Applicants</span>
          <span className="font-medium">${startingSalary}/m</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
