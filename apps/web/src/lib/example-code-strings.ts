/**
 * Code strings for examples that use React hooks
 * These are stored separately to avoid executing hooks during config initialization
 */

export const exampleCodeStrings = {
  calendar: {
    "with-preselected": `const [selected, setSelected] = React.useState<Date | undefined>(new Date());
return <Calendar mode="single" selected={selected} onSelect={setSelected} />;`,
    "specific-default-date": `const [selected, setSelected] = React.useState<Date | undefined>(new Date(2024, 5, 15)); // June 15, 2024
return <Calendar mode="single" selected={selected} onSelect={setSelected} />;`,
    "controlled-single": `const [selected, setSelected] = React.useState<Date | undefined>(new Date());

return (
  <div className="space-y-4">
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
    />
    <p className="text-sm text-zinc-600">
      Selected date: {selected ? selected.toDateString() : "None"}
    </p>
  </div>
);`,
  },
  "date-picker": {
    "with-presets": `const [date, setDate] = React.useState<Date | undefined>(new Date());

const selectPreset = (days: number) => {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + days);
  setDate(newDate);
};

return (
  <div className="space-y-4">
    <div className="flex gap-2">
      <Button onClick={() => selectPreset(0)} size="sm" variant="outline">
        Today
      </Button>
      <Button onClick={() => selectPreset(7)} size="sm" variant="outline">
        Next Week
      </Button>
      <Button onClick={() => selectPreset(30)} size="sm" variant="outline">
        Next Month
      </Button>
    </div>
    <DatePicker value={date} onChange={setDate} />
  </div>
);`,
    controlled: `const [date, setDate] = React.useState<Date | undefined>(new Date());

return (
  <div className="space-y-4">
    <DatePicker value={date} onChange={setDate} />
    <p className="text-sm text-zinc-600">
      Selected: {date ? date.toLocaleDateString() : "None"}
    </p>
  </div>
);`,
  },
  "date-range-picker": {
    "with-presets": `const [range, setRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>({
  from: new Date(),
  to: addDays(new Date(), 7),
});

const selectPreset = (preset: string) => {
  const today = new Date();
  switch (preset) {
    case "last7":
      setRange({ from: subDays(today, 6), to: today });
      break;
    case "last30":
      setRange({ from: subDays(today, 29), to: today });
      break;
    case "thisMonth":
      setRange({
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
      });
      break;
  }
};

return (
  <div className="space-y-4">
    <div className="flex gap-2">
      <Button onClick={() => selectPreset("last7")} size="sm" variant="outline">
        Last 7 Days
      </Button>
      <Button onClick={() => selectPreset("last30")} size="sm" variant="outline">
        Last 30 Days
      </Button>
      <Button onClick={() => selectPreset("thisMonth")} size="sm" variant="outline">
        This Month
      </Button>
    </div>
    <DateRangePicker value={range} onChange={setRange} />
  </div>
);`,
    controlled: `const [range, setRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>({
  from: new Date(),
  to: addDays(new Date(), 7),
});

return (
  <div className="space-y-4">
    <DateRangePicker value={range} onChange={setRange} />
    <p className="text-sm text-zinc-600">
      Selected: {range.from?.toLocaleDateString()} - {range.to?.toLocaleDateString()}
    </p>
  </div>
);`,
  },
  // Add more components with hooks here
};
