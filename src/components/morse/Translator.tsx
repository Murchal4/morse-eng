
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TranslatorCard } from "./TranslatorCard";
import { translateToEnglish, translateToMorse } from "@/utils/morseCodeUtils";
import { Card } from "../ui/card";

export function Translator() {
  const [activeTab, setActiveTab] = useState("english-to-morse");

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs
        defaultValue="english-to-morse"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="english-to-morse">English to Morse</TabsTrigger>
          <TabsTrigger value="morse-to-english">Morse to English</TabsTrigger>
        </TabsList>
        
        <TabsContent value="english-to-morse">
          <TranslatorCard
            title="English to Morse Code"
            inputPlaceholder="Type English text here..."
            outputPlaceholder="Morse code will appear here..."
            translateFn={translateToMorse}
            canPlayAudio={true}
          />
        </TabsContent>
        
        <TabsContent value="morse-to-english">
          <TranslatorCard
            title="Morse Code to English"
            inputPlaceholder="Type Morse code here (use dots, dashes and spaces)..."
            outputPlaceholder="English text will appear here..."
            translateFn={translateToEnglish}
            canPlayAudio={false}
          />
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8 p-4 text-sm text-muted-foreground">
        <h3 className="font-semibold mb-2">Morse Code Guide</h3>
        <p className="mb-2">• Use <span className="font-mono">.</span> for dots and <span className="font-mono">-</span> for dashes</p>
        <p className="mb-2">• Separate letters with a single space</p>
        <p className="mb-2">• Separate words with a forward slash <span className="font-mono">/</span> or three spaces</p>
        <p>• Example: <span className="font-mono">.... . .-.. .-.. --- / .-- --- .-. .-.. -..</span> for "HELLO WORLD"</p>
      </Card>
    </div>
  );
}
