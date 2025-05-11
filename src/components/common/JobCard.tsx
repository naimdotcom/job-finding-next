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

type Props = Job;

export function JobCard({
  company,
  title,
  location,
  requirements,
  startingSalary,
  endingSalary,
  createdAt,
}: Props) {
  return (
    <Card className="w-full h-fit hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-sm">
              {company.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold truncate">
              {title[0].toUpperCase() + title.slice(1)}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {company.name} • {location}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto sm:ml-0"
          aria-label="Save job"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="pb-4 space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="text-green-600 text-xs sm:text-sm"
          >
            Match with your profile
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {requirements.slice(0, 3).map((requirement) => (
            <Badge
              key={requirement}
              variant="outline"
              className="text-xs sm:text-sm"
            >
              {requirement[0].toUpperCase() + requirement.slice(1)}
            </Badge>
          ))}
          {requirements.length > 3 && (
            <Badge variant="outline" className="text-xs sm:text-sm">
              +{requirements.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
          <span>Posted {fromNow(createdAt.toString())}</span>
          <span className="font-medium">
            ${startingSalary}k/m{endingSalary ? ` - ${endingSalary}k/m` : ""}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button size="sm" className="w-full sm:w-auto">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
