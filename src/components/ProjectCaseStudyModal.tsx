import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ExternalLink } from "lucide-react";

interface ProjectResult {
  metric: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: ProjectResult[];
  technologies: string[];
  thumbnail?: string;
  screenshots: string[];
  gradient: string;
  liveUrl?: string;
}

interface ProjectCaseStudyModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectCaseStudyModal = ({ project, open, onOpenChange }: ProjectCaseStudyModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs uppercase tracking-wider">
              {project.category}
            </Badge>
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {project.shortDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Image Carousel */}
        {project.screenshots.length > 0 && (
          <div className="my-6">
            <Carousel className="w-full">
              <CarouselContent>
                {project.screenshots.map((screenshot, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {project.screenshots.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {project.screenshots.length} screenshots
            </p>
          </div>
        )}

        {/* Full Description */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Challenge */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">The Challenge</h3>
            <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">The Solution</h3>
            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Results</h3>
            <div className="grid grid-cols-3 gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-card border border-border">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{result.metric}</div>
                  <div className="text-sm text-muted-foreground mt-1">{result.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Live URL */}
          {project.liveUrl && (
            <div className="pt-4">
              <Button asChild className="w-full md:w-auto">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  View Live Project
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCaseStudyModal;
