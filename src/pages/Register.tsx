
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    "Full Stack Development",
    "Data Science & Analytics",
    "Java Programming",
    "Aptitude Training",
    "Cloud Computing (AWS)",
    "Mobile App Development",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(formData.phone) || formData.phone.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful! 🎉",
        description: "Thank you for registering! Our team will contact you within 24 hours to schedule your demo session.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        experience: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Register for Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take the first step towards your tech career. Register for a free demo 
            session and discover how Tech Miya can transform your future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Registration Form */}
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Demo Registration</CardTitle>
              <CardDescription>
                Fill out the form below and we'll contact you to schedule your personalized demo session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="course">Course Interested In *</Label>
                  <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experience">Programming Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Complete Beginner</SelectItem>
                      <SelectItem value="basic">Basic Knowledge</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals, questions, or anything else you'd like us to know..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Register for Demo"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-xl">What's Included in Your Demo?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">✨</span>
                  <div>
                    <h4 className="font-semibold">Personalized Course Overview</h4>
                    <p className="text-blue-100">Get a detailed walkthrough of your chosen course curriculum</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">💼</span>
                  <div>
                    <h4 className="font-semibold">Career Guidance</h4>
                    <p className="text-blue-100">Learn about job opportunities and salary expectations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <h4 className="font-semibold">Learning Path Assessment</h4>
                    <p className="text-blue-100">Get a customized learning plan based on your background</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <h4 className="font-semibold">One-on-One Consultation</h4>
                    <p className="text-blue-100">Direct interaction with our expert counselors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Why Students Choose Tech Miya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Job Placement Rate</span>
                  <span className="font-bold text-green-600">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Salary Increase</span>
                  <span className="font-bold text-green-600">300%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Student Satisfaction</span>
                  <span className="font-bold text-green-600">4.9/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Industry Partnerships</span>
                  <span className="font-bold text-green-600">50+</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <h4 className="font-semibold text-yellow-800">Limited Time Offer</h4>
                    <p className="text-yellow-700">Register now and get 20% off on your course enrollment!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
