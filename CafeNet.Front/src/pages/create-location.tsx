import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createLocation } from "@/services/locationService";

const formSchema = z.object({
    address: z.string().min(2).max(100),
})

function CreateLocationPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
        },
    })
    

    function onSubmit(values: z.infer<typeof formSchema>) {
        const response = createLocation(values);
    }

    return (
        <div className="centerBox">
            <h1>Create new location</h1>
            <br/><br/>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Location address</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Create location</Button>
            </form>
            </Form>
        </div>
    )
}

export default CreateLocationPage;