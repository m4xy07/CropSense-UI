import { useId } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextAreaComponent() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Textarea with right button</Label>
      <Textarea id={id} placeholder="Leave a comment" />
      <div className="flex justify-end">
        <Button variant="outline" type="submit">Send</Button>
      </div>
    </div>
  )
}
