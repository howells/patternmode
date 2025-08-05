"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./component";

export const DefaultExample = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue>Select a fruit...</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const WithGroupsExample = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue>Select a timezone...</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>North America</SelectGroupLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Europe & Africa</SelectGroupLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};


export const MultipleSelectionExample = () => {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <div className="space-y-4">
      <Select
        multiple
        value={values}
        onValueChange={setValues}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue>Select multiple fruits...</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectContent>
      </Select>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Selected: {values.length > 0 ? values.join(", ") : "None"}
      </div>
    </div>
  );
};

export const ControlledExample = () => {
  const [value, setValue] = React.useState<string>("apple");

  return (
    <div className="space-y-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <button
          onClick={() => setValue("banana")}
          className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded"
        >
          Set to Banana
        </button>
        <button
          onClick={() => setValue("")}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded"
        >
          Clear
        </button>
      </div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Current value: {value || "None"}
      </div>
    </div>
  );
};


export const ObjectValuesExample = () => {
  type User = {
    id: string;
    name: string;
    email: string;
    role: string;
  };

  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  ];

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  return (
    <div className="space-y-4">
      <Select
        value={selectedUser?.id || ""}
        onValueChange={(value) => {
          const user = users.find(u => u.id === value) || null;
          setSelectedUser(user);
        }}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue>Select a user...</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {users.map(user => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-zinc-500">{user.email} • {user.role}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedUser && (
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md text-sm">
          <div><strong>Selected User:</strong></div>
          <div>Name: {selectedUser.name}</div>
          <div>Email: {selectedUser.email}</div>
          <div>Role: {selectedUser.role}</div>
        </div>
      )}
    </div>
  );
};

export const CustomRenderValueExample = () => {
  type Option = {
    value: string;
    label: string;
    color: string;
  };

  const options: Option[] = [
    { value: "red", label: "Red", color: "#ef4444" },
    { value: "blue", label: "Blue", color: "#3b82f6" },
    { value: "green", label: "Green", color: "#10b981" },
    { value: "purple", label: "Purple", color: "#8b5cf6" },
  ];

  const [selectedValue, setSelectedValue] = React.useState<string>("");

  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <Select
      value={selectedValue}
      onValueChange={setSelectedValue}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue>
          {selectedOption
            ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedOption.color }}
                  />
                  {selectedOption.label}
                </div>
              )
            : (
                "Select a color..."
              )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: option.color }}
              />
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const FormIntegrationExample = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    country: "",
    plan: "free",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg max-w-md">
      <h3 className="text-lg font-semibold">User Registration</h3>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your full name"
          className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Country *
        </label>
        <Select
          name="country"
          required
          value={formData.country}
          onValueChange={value => setFormData(prev => ({ ...prev, country: value }))}
        >
          <SelectTrigger>
            <SelectValue>Select your country...</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">🇺🇸 United States</SelectItem>
            <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
            <SelectItem value="ca">🇨🇦 Canada</SelectItem>
            <SelectItem value="au">🇦🇺 Australia</SelectItem>
            <SelectItem value="de">🇩🇪 Germany</SelectItem>
            <SelectItem value="fr">🇫🇷 France</SelectItem>
            <SelectItem value="jp">🇯🇵 Japan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Plan Type
        </label>
        <Select
          name="plan"
          value={formData.plan}
          onValueChange={value => setFormData(prev => ({ ...prev, plan: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free Plan - $0/month</SelectItem>
            <SelectItem value="pro">Pro Plan - $10/month</SelectItem>
            <SelectItem value="enterprise">Enterprise Plan - $50/month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Register
      </button>
    </form>
  );
};

export const SmallSizeExample = () => {
  return (
    <Select>
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue>Select size...</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="xs">Extra Small</SelectItem>
        <SelectItem value="sm">Small</SelectItem>
        <SelectItem value="md">Medium</SelectItem>
        <SelectItem value="lg">Large</SelectItem>
        <SelectItem value="xl">Extra Large</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const ErrorStateExample = () => {
  const [value, setValue] = React.useState<string>("");
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      setShowError(true);
    }
    else {
      setShowError(false);
      alert(`Selected: ${value}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        Required Field *
      </label>
      <Select
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          if (newValue) {
            setShowError(false);
          }
        }}
      >
        <SelectTrigger hasError={showError} className="w-[200px]">
          <SelectValue>Please select an option...</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
      {showError && (
        <p className="text-sm text-red-600">This field is required.</p>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export const DisabledExample = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Disabled Select (No Value)
        </label>
        <Select disabled>
          <SelectTrigger className="w-[200px]">
            <SelectValue>This is disabled...</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Disabled with Value
        </label>
        <Select disabled defaultValue="option1">
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Selected Option</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Disabled Items
        </label>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue>Some items disabled...</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available Option</SelectItem>
            <SelectItem value="disabled1" disabled>Disabled Option 1</SelectItem>
            <SelectItem value="available2">Another Available</SelectItem>
            <SelectItem value="disabled2" disabled>Disabled Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};





