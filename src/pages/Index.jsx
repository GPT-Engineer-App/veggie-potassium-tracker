import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [vegetables, setVegetables] = useState([]);
  const [vegetableName, setVegetableName] = useState("");
  const [potassiumContent, setPotassiumContent] = useState("");
  const [desiredIntake, setDesiredIntake] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const addVegetable = () => {
    if (!vegetableName || !potassiumContent) {
      setError("Please fill in all fields.");
      return;
    }
    setVegetables([
      ...vegetables,
      { name: vegetableName, potassium: parseFloat(potassiumContent) },
    ]);
    setVegetableName("");
    setPotassiumContent("");
    setError("");
  };

  const calculatePortions = () => {
    if (!desiredIntake) {
      setError("Please enter the desired potassium intake.");
      return;
    }

    const totalPotassium = vegetables.reduce(
      (sum, veg) => sum + veg.potassium,
      0
    );

    if (totalPotassium > desiredIntake) {
      setError("Total potassium exceeds the desired intake.");
      return;
    }

    const portions = vegetables.map((veg) => ({
      name: veg.name,
      portion: ((desiredIntake / totalPotassium) * 100).toFixed(2),
    }));

    setResults(portions);
    setError("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Potassium Intake Calculator</h1>
      <p className="mb-6">
        Calculate the necessary portion of vegetables to avoid exceeding the
        recommended potassium intake for your body.
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Vegetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="vegetableName">Vegetable Name</Label>
            <Input
              id="vegetableName"
              value={vegetableName}
              onChange={(e) => setVegetableName(e.target.value)}
              placeholder="e.g., Spinach"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="potassiumContent">Potassium Content per 100g</Label>
            <Input
              id="potassiumContent"
              type="number"
              value={potassiumContent}
              onChange={(e) => setPotassiumContent(e.target.value)}
              placeholder="e.g., 558"
            />
          </div>
          <Button onClick={addVegetable}>Add Vegetable</Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Desired Potassium Intake</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="desiredIntake">Desired Potassium Intake (mg)</Label>
            <Input
              id="desiredIntake"
              type="number"
              value={desiredIntake}
              onChange={(e) => setDesiredIntake(e.target.value)}
              placeholder="e.g., 3500"
            />
          </div>
          <Button onClick={calculatePortions}>Calculate</Button>
        </CardContent>
      </Card>

      {error && (
        <Alert className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.map((result, index) => (
              <div key={index} className="mb-2">
                {result.name}: {result.portion}g
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;