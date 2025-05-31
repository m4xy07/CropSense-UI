"use client"

import { useId, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import SearchDropComponent from "../comp-229"
import RadioGroupComponent from "../comp-153"


const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "professional", title: "Professional" },
  { id: "goals", title: "Website Goals" },
  { id: "design", title: "Design" },
  { id: "budget", title: "Budget" },
  { id: "requirements", title: "Requirements" }
]


interface FormData {
  name: string;
  email: string;
  company: string;
  profession: string;
  professionElaborate: string;
  experience: string;
  industry: string;
  industryElaborate: string;
  irrigationSystem: string;
  irrigationSystemElaborate: string; // <-- add this
  primaryGoal: string;
  targetAudience: string;
  contentTypes: string[];
  colorPreference: string;
  stylePreference: string;
  inspirations: string;
  budget: string;
  timeline: string;
  features: string[];
  additionalInfo: string;
}


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
}

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    profession: "",
    professionElaborate: "",
    experience: "",
    industry: "",
    industryElaborate: "",
    irrigationSystem: "",
    irrigationSystemElaborate: "", // <-- add this
    primaryGoal: "",
    targetAudience: "",
    contentTypes: [],
    colorPreference: "",
    stylePreference: "",
    inspirations: "",
    budget: "",
    timeline: "",
    features: [],
    additionalInfo: "",
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.features]
      if (features.includes(feature)) {
        return { ...prev, features: features.filter((f) => f !== feature) }
      } else {
        return { ...prev, features: [...features, feature] }
      }
    })
  }

  const toggleContentType = (type: string) => {
    setFormData((prev) => {
      const types = [...prev.contentTypes]
      if (types.includes(type)) {
        return { ...prev, contentTypes: types.filter((t) => t !== type) }
      } else {
        return { ...prev, contentTypes: [...types, type] }
      }
    })
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Form submitted:", formData)
      toast.success("Form submitted successfully!")
      setIsSubmitting(false)
      window.location.href = "/dashboard";
    }, 1500)
  }

  // Check if step is valid for next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        // Step 0: Require industry, and if 'other', require elaboration (currently mapped to email)
        if (formData.industry === "other") {
          return formData.industryElaborate.trim() !== "";
        }
        return formData.industry !== "";
      case 1:
        if (formData.profession === "no") {
          return formData.profession.trim() !== "" && formData.professionElaborate.trim() !== "";
        }
        return formData.profession.trim() !== "";
      case 2:
        // Step 3 validation:
        if (formData.irrigationSystem === "other") {
          return formData.irrigationSystem.trim() !== "" && formData.irrigationSystemElaborate.trim() !== "" && formData.primaryGoal.trim() !== "";
        }
        return formData.irrigationSystem.trim() !== "" && formData.primaryGoal.trim() !== "";
      case 3:
        return formData.stylePreference !== "";
      case 4:
        return formData.budget !== "" && formData.timeline !== "";
      default:
        return true;
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const id = useId()

  return (
    <div className="w-full max-w-lg mx-auto p-2">
      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-transparent border-none rounded-3xl overflow-hidden w-[500px] transition-all duration-200 ease-in-out">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <>
                    <CardHeader className="!flex-col items-start">
                      <CardTitle>Tell us about your farm operations</CardTitle>
                      <CardDescription>Let's start with some basic information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="industry">What type of farming do you practice?</Label>
                        <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                          <SelectTrigger id="industry" className="transition-all duration-300 equipment-input theme-color bg-[rgba(255,255,255,.025)] !px-3">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Crop Farming</SelectItem>
                            <SelectItem value="healthcare">Horticulture</SelectItem>
                            <SelectItem value="education">Mixed</SelectItem>
                            <SelectItem value="finance">Organic</SelectItem>
                            <SelectItem value="retail">Greenhouse</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                      {formData.industry === "other" && (
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Input
                            id="industryElaborate"
                            type="text"
                            placeholder="Elaborate on your farming practices"
                            value={formData.industryElaborate}
                            onChange={(e) => updateFormData("industryElaborate", e.target.value)}
                            className="transition-all duration-300 equipment-input theme-color bg-[rgba(255,255,255,.025)] !px-3"
                          />
                        </motion.div>
                      )}
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="company">What was the last crop you planted?</Label>
                        <SearchDropComponent />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 2: Professional Background */}
                {currentStep === 1 && (
                  <>
                  <CardHeader className="!flex-col items-start">
                    <CardTitle>Tell us about your farm operations</CardTitle>
                    <CardDescription>Let's start with some basic information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                    <Label htmlFor="profession">Are you currently growing any crops?</Label>
                    <RadioGroup
                      value={formData.profession}
                      onValueChange={(value) => updateFormData("profession", value)}
                      className="transition-all ease-in-out duration-200 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]"
                    >
                      <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id={`${id}-1`} />
                      <Label htmlFor={`${id}-1`}>Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id={`${id}-2`} />
                      <Label htmlFor={`${id}-2`}>No</Label>
                      </div>
                    </RadioGroup>
                    </motion.div>

                    {formData.profession === "yes" ? (
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <SearchDropComponent />
                    </motion.div>
                    ) : formData.profession === "no" ? (
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Input
                      id="professionElaborate"
                      type="text"
                      placeholder="When was the last time you grew crops?"
                      value={formData.professionElaborate}
                      onChange={(e) => updateFormData("professionElaborate", e.target.value)}
                      className="transition-all duration-300 equipment-input theme-color bg-[rgba(255,255,255,.025)] !px-3"
                      />
                    </motion.div>
                    ) : null}
                  </CardContent>
                  </>
                )}

                {/* Step 3: Website Goals */}
                {currentStep === 2 && (
                  <>
                    <CardHeader className="!flex-col items-start">
                    <CardTitle>Tell us about your farm operations</CardTitle>
                    <CardDescription>Let's start with some basic information</CardDescription>
                  </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="irrigationSystem">What type of irrigation system do you use?</Label>
                        <Select value={formData.irrigationSystem} onValueChange={(value) => updateFormData("irrigationSystem", value)}>
                          <SelectTrigger id="irrigationSystem" className="transition-all duration-300 equipment-input theme-color bg-[rgba(255,255,255,.025)] !px-3">
                            <SelectValue placeholder="Select an irrigation system" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="drip">Drip</SelectItem>
                            <SelectItem value="sprinkler">Sprinkler</SelectItem>
                            <SelectItem value="borewell">Borewell</SelectItem>
                            <SelectItem value="rainfed">Rain-fed</SelectItem>
                            <SelectItem value="canal">Canal</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                      {formData.irrigationSystem === "other" && (
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Input
                            id="irrigationSystemElaborate"
                            type="text"
                            placeholder="Elaborate on your irrigation system"
                            value={formData.irrigationSystemElaborate || ""}
                            onChange={(e) => updateFormData("irrigationSystemElaborate", e.target.value)}
                            className="transition-all duration-300 equipment-input theme-color bg-[rgba(255,255,255,.025)] !px-3"
                          />
                        </motion.div>
                      )}
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="primaryGoal">What is your primary goal?</Label>
                        <Select value={formData.primaryGoal} onValueChange={(value) => updateFormData("primaryGoal", value)}>
                          <SelectTrigger id="primaryGoal" className="transition-all duration-300 equipment-input theme-color bg-[rgba(255,255,255,.025)] !px-3">
                            <SelectValue placeholder="Select a goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="increaseYield">Increase yield</SelectItem>
                            <SelectItem value="saveWater">Save water</SelectItem>
                            <SelectItem value="pestAlerts">Get pest alerts</SelectItem>
                            <SelectItem value="soilHealth">Monitor soil health</SelectItem>
                            <SelectItem value="govtSchemes">Access government schemes</SelectItem>
                            <SelectItem value="weatherWarnings">Receive weather warnings</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => prevStep()}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 duration-200 w-fit py-2 px-4 rent-now-btn rounded-full !min-w-fit text-neutral-50 tracking-tight border border-neutral-400/20 font-normal font-inter text-sm equipment-btn transition-all"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "flex items-center gap-1 duration-200 w-fit py-2 px-4 next-btn rounded-full !min-w-fit text-neutral-50 tracking-tight border border-neutral-400/20 font-normal font-inter text-sm transition-all",
                    currentStep === 2 ? "" : ""
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === 2 ? "Submit" : "Next"}
                      {currentStep === 2 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default OnboardingForm