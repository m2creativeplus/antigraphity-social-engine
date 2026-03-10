"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Send, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface CampaignPost {
  platform: string;
  content: string;
  imagePromptDesc?: string;
  videoPromptDesc?: string;
}

export default function ContentFactory() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("somali");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("linkedin");
  const [campaignOutputs, setCampaignOutputs] = useState<CampaignPost[] | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error("Please enter a topic first.");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Initializing Agent Swarm...", { description: "Gemini 2.5 Pro is analyzing your topic." });
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          tone,
          language,
          platforms: ['LinkedIn', 'X (Twitter)', 'Facebook', 'Instagram']
        })
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to generate");

      setCampaignOutputs(data.campaign.posts);
      toast.success("Campaign Generated Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Generation Failed", { description: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-8 h-full">
      {/* Background radial gradient for premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none -z-10 -m-8" />
      
      {/* Left Column: Creator Panel */}
      <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Content Factory</h1>
            <p className="text-muted-foreground">Antigraphity Multi-Agent Engine</p>
          </div>
        </div>

        <Card className="glass-card shadow-lg">
          <CardHeader>
            <CardTitle>Campaign Brief</CardTitle>
            <CardDescription>Enter your core idea. Our AI agents will expand it across all platforms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Main Topic / Directive <span className="text-destructive">*</span></Label>
              <Textarea 
                id="topic" 
                placeholder="e.g., Announce the new SNPA printing regulations for local businesses..." 
                className="min-h-[120px] resize-none bg-background/50 border-white/10 focus-visible:ring-primary/50"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Brand Tone</Label>
                <Select value={tone} onValueChange={(val) => val && setTone(val)}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Institutional / Professional</SelectItem>
                    <SelectItem value="Diplomatic">Diplomatic / Formal</SelectItem>
                    <SelectItem value="Conversational">Conversational / Engaging</SelectItem>
                    <SelectItem value="Urgent">Urgent / Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Output Language</Label>
                <Select value={language} onValueChange={(val) => val && setLanguage(val)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="somali">Somali (Primary)</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="multi">All Three (Multi-lingual)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label>Platform Distribution</Label>
              <div className="flex flex-wrap gap-2">
                {['LinkedIn', 'X (Twitter)', 'Facebook', 'Instagram'].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2 rounded-md border border-white/10 p-2 px-3 bg-muted/30">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full relative overflow-hidden group glow-primary font-semibold text-primary-foreground" 
              onClick={handleGenerate}
              disabled={isGenerating}
              size="lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isGenerating ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Orchestrating Agents...</>
                ) : (
                  <><Sparkles className="h-4 w-4" /> Generate Campaign</>
                )}
              </span>
              {!isGenerating && (
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Right Column: Real-Time Preview Matrix */}
      <div className="md:col-span-7 lg:col-span-8 flex flex-col min-h-[600px] z-10">
        <Card className="flex-1 flex flex-col overflow-hidden glass-card shadow-2xl">
          <CardHeader className="border-b border-white/10 bg-muted/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Real-Time Output Matrix
              </CardTitle>
              {isGenerating && <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse glow-primary"></span>}
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            {!isGenerating && (!campaignOutputs) && topic === "" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-transparent">
                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <Sparkles className="h-10 w-10 text-primary opacity-50" />
                </div>
                <h3 className="text-xl font-medium text-foreground tracking-tight">Awaiting Directive</h3>
                <p className="max-w-sm mt-2 text-sm leading-relaxed">Enter your topic on the left to activate the Gemini 2.5 Pro multi-agent team.</p>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col w-full">
                <div className="border-b px-6 py-2 bg-background">
                  <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-4">
                    <TabsTrigger value="linkedin" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-1">LinkedIn</TabsTrigger>
                    <TabsTrigger value="x" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-1">X (Twitter)</TabsTrigger>
                    <TabsTrigger value="facebook" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-1">Facebook</TabsTrigger>
                    <TabsTrigger value="instagram" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-1">Instagram</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex-1 overflow-auto bg-muted/10 p-6">
                  {isGenerating ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6 h-full min-h-[400px]">
                      <div className="relative">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse" />
                      </div>
                      <div className="text-sm text-center">
                        <p className="font-medium text-foreground text-lg">Agent 1: Content Strategist active...</p>
                        <p className="text-muted-foreground animate-pulse mt-2">Applying SCALE framework to &quot;{topic.substring(0, 20)}...&quot;</p>
                      </div>
                    </div>
                  ) : campaignOutputs ? (
                    <TabsContent value={activeTab} className="m-0 flex-1 h-full min-h-[400px]">
                      <div className="max-w-xl mx-auto rounded-xl shadow-xl border border-white/5 p-6 space-y-4 bg-card/60 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center"><Sparkles className="h-5 w-5 text-primary"/></div>
                          <div>
                            <div className="font-bold text-sm">Official Institution Name</div>
                            <div className="text-xs text-muted-foreground">Just now • 🌐</div>
                          </div>
                        </div>
                        <div className="space-y-3 text-sm whitespace-pre-wrap">
                          {campaignOutputs.find((p: CampaignPost) => p.platform.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]))?.content || "Content not generated for this platform."}
                        </div>
                        
                        <div className="space-y-2 mt-4 text-xs">
                          <div className="p-3 bg-muted/50 rounded-md border text-muted-foreground">
                            <strong><Sparkles className="inline h-3 w-3 mr-1"/> Agent 3 (Visual) Image Prompt:</strong><br/>
                            {campaignOutputs.find((p: CampaignPost) => p.platform.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]))?.imagePromptDesc}
                          </div>
                          <div className="p-3 bg-muted/50 rounded-md border text-muted-foreground">
                            <strong><Sparkles className="inline h-3 w-3 mr-1"/> Agent 4 (Video) Scene Prompt:</strong><br/>
                            {campaignOutputs.find((p: CampaignPost) => p.platform.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]))?.videoPromptDesc}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-2 border-t text-muted-foreground text-sm mt-4">
                          <Button variant="ghost" size="sm" className="gap-2"><Copy className="h-4 w-4"/> Copy Content</Button>
                          <Button variant="ghost" size="sm" className="gap-2"><Send className="h-4 w-4"/> Push to Approval</Button>
                        </div>
                      </div>
                    </TabsContent>
                  ) : null}
                  {/* Additional TabsContent for X, Facebook, Instagram would go here */}
                </div>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
