"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addMatter } from "@/app/dashboard/actions";

export function AddMatterDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [dealValue, setDealValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("practice_area", practiceArea);
    formData.append("deal_value", dealValue);
    
    await addMatter(formData);
    setOpen(false);
    setTitle("");
    setPracticeArea("");
    setDealValue("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
        Add Matter
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Matter</DialogTitle>
            <DialogDescription>
              Create a new matter here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="practice_area" className="text-right">
                Practice Area
              </Label>
              <Input
                id="practice_area"
                value={practiceArea}
                onChange={(e) => setPracticeArea(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deal_value" className="text-right">
                Deal Value
              </Label>
              <Input
                id="deal_value"
                value={dealValue}
                onChange={(e) => setDealValue(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
