"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import { Rating, RatingButton } from "./ui/shadcn-io/rating"
import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CodeLanguages = [
  "C++",
  "Java",
  "Python3",
  "Python",
  "JavaScript",
  "TypeScript",
  "C#",
  "C",
  "Go",
  "Kotlin",
  "Swift",
  "Rust",
  "Ruby",
  "PHP",
  "Dart",
  "Scala",
  "Elixir",
  "Erlang",
  "Racket",
] as const;

const formSchema = z.object({
    post_title: z
        .string()
        .min(5, "Post title must be at least 5 characters.")
        .max(32, "Post title must be at most 32 characters."),
    post_problem_title: z
        .string()
        .min(5, "Problem title must be at least 5 characters.")
        .max(32, "Problem title must be at most 32 characters."),
    post_problem_difficulty: z
        .string()
        .min(5, "Problem title must be at least 5 characters.")
        .max(32, "Problem title must be at most 32 characters."),
    post_solution_language: z
        .string()
        .min(1, "Please select your spoken language.")
        .refine((val) => val !== "auto", {
        message:
            "Auto-detection is not allowed. Please select a specific language.",
        }),
    post_caption: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(1000, "Description must be at most 100 characters."),
    post_rating: z
        .int()
        .min(0)
        .max(5),
    post_solution: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(1000, "Description must be at most 100 characters."),
})

export function PostComposeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    post_title: "",
    post_problem_title: "",
    post_problem_difficulty: "",
    post_solution_language: "",
    post_caption: "",
    post_rating: 1,
    post_solution: "",
  },
})

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full max-w-[90%] h-full max-h-[90%] p-6 shadow-md border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Dev Post</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>





            


            <Controller
              name="post_title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Post Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Post Title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /><Controller
              name="post_title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Post Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Post Title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />







            <Controller
              name="post_caption"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />








            <Controller
                name="post_solution_language"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field orientation="responsive" data-invalid={fieldState.invalid}>
                    <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-language">
                        Programming Language
                        </FieldLabel>
                        <FieldDescription>
                        Choose the language of your code snippet.
                        </FieldDescription>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>

                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[180px]"
                        >
                        <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent className="w-lg p-3">
                            <div className="grid grid-cols-3 gap-2">
                                {CodeLanguages.map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                    {lang}
                                </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                    </Field>
                )}
                />



                <Controller
                name="post_rating"
                control={form.control}
                defaultValue={1} // start with 1 stars
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Rating</FieldLabel>
                    <FieldDescription>Rate the difficulty of this problem (1-5).</FieldDescription>

                    <Rating
                        value={field.value}          // bind value from RHF
                        onValueChange={field.onChange} // update RHF on change
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                        <RatingButton key={num} aria-label={`${num} star`} />
                        ))}
                    </Rating>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />

                <Controller
              name="post_caption"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />



          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
