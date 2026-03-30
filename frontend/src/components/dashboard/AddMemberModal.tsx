import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const AddMemberModal = ({ open, setOpen }: { open: boolean, setOpen: (o: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Council Member</DialogTitle>
          <DialogDescription>
            Bootstrap a new core role in your organization or attach an external vendor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Title / Role</Label>
            <Input id="name" placeholder="e.g. Lead Developer, Sales Ops" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="persona">Persona Template</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a seed model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hacker">The Hacker (Fast Iteration)</SelectItem>
                <SelectItem value="builder">The Builder (Stability)</SelectItem>
                <SelectItem value="vendor">External Vendor (Restricted)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 border p-3 rounded-lg bg-slate-50">
            <Checkbox id="slack-connect" />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="slack-connect" className="text-sm font-medium leading-none">
                Auto-Connect Slack & Gmail
              </label>
              <p className="text-xs text-muted-foreground">
                Enable passive learning from chat and email.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Deploy Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
