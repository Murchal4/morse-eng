
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, ClipboardCopy, RefreshCw } from "lucide-react";
import { MorseVisualizer } from "./MorseVisualizer";
import { playMorseCode } from "@/utils/morseCodeUtils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface TranslatorCardProps {
  title: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  translateFn: (text: string) => string;
  canPlayAudio?: boolean;
}

export function TranslatorCard({
  title,
  inputPlaceholder,
  outputPlaceholder,
  translateFn,
  canPlayAudio = false,
}: TranslatorCardProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const handleTranslate = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    setIsTranslating(true);
    try {
      const translated = translateFn(input);
      setOutput(translated);
    } catch (error) {
      toast({
        title: "Translation Error",
        description: "There was an error translating the text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-translate as you type
    if (e.target.value.trim()) {
      const translated = translateFn(e.target.value);
      setOutput(translated);
    } else {
      setOutput("");
    }
  };

  const handleClearClick = () => {
    setInput("");
    setOutput("");
  };

  const handleCopyClick = () => {
    if (!output) return;
    
    navigator.clipboard.writeText(output).then(
      () => {
        toast({
          title: "Copied!",
          description: "Text copied to clipboard",
        });
      },
      () => {
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      }
    );
  };

  const handlePlayAudio = async () => {
    if (!output || !canPlayAudio) return;
    
    try {
      await playMorseCode(output);
    } catch (error) {
      toast({
        title: "Audio Error",
        description: "Could not play Morse code audio",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder={inputPlaceholder}
            value={input}
            onChange={handleInputChange}
            className="w-full min-h-[100px] font-mono resize-y"
          />
        </div>
        
        {output && canPlayAudio && (
          <MorseVisualizer morseCode={output} />
        )}
        
        <div className="space-y-2">
          <Textarea
            placeholder={outputPlaceholder}
            value={output}
            readOnly
            className="w-full min-h-[100px] bg-muted/50 font-mono resize-y"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleClearClick} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button
            variant="outline"
            onClick={handleCopyClick}
            disabled={!output}
            size="sm"
          >
            <ClipboardCopy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        
        {canPlayAudio && (
          <Button
            variant="outline"
            onClick={handlePlayAudio}
            disabled={!output}
            size="sm"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Play
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
