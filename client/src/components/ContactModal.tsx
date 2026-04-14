import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, AlertCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  freelancerName: string;
  freelancerId: string;
}

export function ContactModal({ isOpen, onClose, freelancerName, freelancerId }: ContactModalProps) {
  const [projectTitle, setProjectTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("1-2 weeks");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        // Reset form
        setProjectTitle("");
        setBudget("");
        setTimeline("1-2 weeks");
        setDescription("");
      }, 2000);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Send Project to {freelancerName}</span>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </DialogTitle>
          <DialogDescription>
            Describe your project and let {freelancerName} know what you need.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <Send className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-lg">Project Sent!</h3>
            <p className="text-sm text-muted-foreground">
              {freelancerName} will review your project and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Title */}
            <div>
              <label className="text-sm font-medium mb-2 block">Project Title</label>
              <Input
                placeholder="e.g., Website Redesign, Blog Post Series"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm font-medium mb-2 block">Budget Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  className="flex-1"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                />
                <span className="flex items-center text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="flex-1"
                  disabled
                  value={budget ? parseInt(budget) * 2 : ""}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {freelancerName}'s starting rate is shown above
              </p>
            </div>

            {/* Timeline */}
            <div>
              <label className="text-sm font-medium mb-2 block">Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option>Less than 1 week</option>
                <option>1-2 weeks</option>
                <option>2-4 weeks</option>
                <option>1-3 months</option>
                <option>3+ months</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">Project Description</label>
              <Textarea
                placeholder="Tell {freelancerName} about your project, goals, and any specific requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 dark:text-blue-300">
                Once sent, {freelancerName} will review your project details and respond with their availability and final quote.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !projectTitle || !description}
                className="flex-1 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Project
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
