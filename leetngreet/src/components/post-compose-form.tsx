"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Editor from "react-simple-code-editor"
import { Highlight, themes } from "prism-react-renderer"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const theme = themes.duotoneDark

const CodeLanguages = [
  "None",
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

// 🧩 Add this near the top, before the component
const languageMap: Record<string, string> = {
  "none": "text",
  "c++": "cpp",
  "c#": "csharp",
  "python3": "python",
  "racket": "scheme",
  // everything else lowercased should match directly
}

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
        .max(1000, "Description must be at most 100 characters."),
    post_rating: z
        .int()
        .min(0)
        .max(5),
    post_solution: z
        .string()
        .max(7000, "Solution must be at most 7000 characters."),
})

export function PostComposeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      post_title: "",
      post_problem_title: "",
      post_problem_difficulty: "",
      post_solution_language: "None",
      post_caption: "",
      post_rating: 1,
      post_solution: "",
    },
  })

  const editorRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll tracking: keep caret visible
  React.useEffect(() => {
    const textarea = editorRef.current?.querySelector("textarea")
    if (!textarea) return

    const code = form.watch("post_solution")
    
    const handleScroll = () => {
      const selectionStart = textarea.selectionStart
      const lines = code.slice(0, selectionStart).split("\n")
      const currentLine = lines.length - 1

      const pre = editorRef.current?.querySelector("pre")
      const lineEl = pre?.children[currentLine] as HTMLElement | undefined
      if (lineEl) lineEl.scrollIntoView({ block: "nearest" })
    }

    textarea.addEventListener("input", handleScroll)
    textarea.addEventListener("keyup", handleScroll)
    textarea.addEventListener("click", handleScroll)

    return () => {
      textarea.removeEventListener("input", handleScroll)
      textarea.removeEventListener("keyup", handleScroll)
      textarea.removeEventListener("click", handleScroll)
    }
  }, [form.watch("post_solution")])

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

  const selectedLang = form.watch("post_solution_language")?.toLowerCase() || "none"
  const prismLang = languageMap[selectedLang] || selectedLang

  return (
    <Card className="w-full max-w-[95%] h-full max-h-[90%] p-6 shadow-md border rounded-2xl">
      <CardContent>
        <form id="form-rhf-demo"  onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="h-full grid grid-cols-3 gap-6">
            <div className="flex h-full flex-col gap-y-4">
              <CardTitle className="text-2xl">Post Title</CardTitle>
              <Controller
                name="post_title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
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
                name="post_problem_title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-problem-title">
                      Problem Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-problem-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Problem Title"
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
                        className="min-h-70 max-h-70 resize-none overflow-y-auto"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/1000 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="post_rating"
                control={form.control}
                defaultValue={1}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Rating</FieldLabel>
                    <FieldDescription>Rate the difficulty of this problem (1-5).</FieldDescription>

                    <Rating
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <RatingButton key={num} aria-label={`${num} star`} />
                      ))}
                    </Rating>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <div className="col-span-2 ">
              <div className="pb-1">
              <Controller
                name="post_solution_language"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field orientation="responsive" data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <div className="form-rhf-demo-solution-language justify-center pt-1">Solution</div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>

                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                      <div className="form-rhf-demo-solution-language justify-center pt-1 text-muted-foreground">Language</div>
                      <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[180px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent className="w-lg translate-x-[-40px] p-3">
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
              </div>


              <Controller
                name="post_solution"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>

                    <div
                      ref={editorRef}
                      className="relative border border-input rounded-lg bg-accent shadow-sm overflow-auto"
                      style={{
                        minHeight: "38rem",  
                        maxHeight: "38rem",
                        fontFamily: '"Fira Code", monospace',
                        fontSize: 14,
                        lineHeight: "1.6em",
                      }}
                    >
                      <Editor
                        textareaClassName="editor-textarea"
                        value={field.value}
                        onValueChange={field.onChange}
                        highlight={(code) => (
                          <Highlight code={code} language={prismLang} theme={theme}>
                            {({ tokens, getLineProps, getTokenProps }) => (
                              <pre
                                className="m-0 p-0"
                                style={{
                                  fontFamily: '"Fira Code", monospace',
                                  fontSize: 14,
                                  lineHeight: "1.6em",
                                  tabSize: 2,
                                  whiteSpace: "pre",
                                }}
                              >
                                {tokens.map((line, i) => (
                                  <div
                                    key={i}
                                    {...getLineProps({ line })}
                                    className="flex leading-[1.6em]"
                                  >
                                    {/* Line numbers */}
                                    <span className="select-none opacity-40 w-8 text-right pr-3">
                                      {i + 1}
                                    </span>
                                    {/* Syntax highlighted code */}
                                    <span className="flex-1 whitespace-pre-wrap">
                                      {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                      ))}
                                    </span>
                                  </div>
                                ))}
                              </pre>
                            )}
                          </Highlight>
                        )}
                        padding={12}
                        style={{
                          fontFamily: '"Fira Code", monospace',
                          fontSize: 14,
                          lineHeight: "1.6em",
                          minHeight: "37.85rem",
                          overflow: "visible",
                          outline: "none",
                          whiteSpace: "pre",
                          caretColor: "#fff",
                        }}
                      />

                      <style jsx>{`
                        :global(.editor-textarea) {
                          padding-left: 43px !important;
                        }
                      `}</style>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-s text-muted-foreground tabular-nums">
                        {field.value.length}/7000 characters
                      </span>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <div className="ml-auto w-full justify-end flex pt-1 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="form-rhf-demo"
                >
                  Submit
                </Button>
              </div>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}