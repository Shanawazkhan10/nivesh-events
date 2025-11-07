"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function EventAnalytics({ events, fetchData }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  // Extract unique categories
  const categories = [...new Set(events.map((e) => e.category))];

  // Filter logic
  // const filteredEvents = useMemo(() => {
  //   return events.filter((e) => {
  //     const matchesName = e.name.toLowerCase().includes(searchText.toLowerCase());
  //     const matchesCategory = selectedCategory ? e.category === selectedCategory : true;
  //     const eventDate = dayjs(e.created_at);
  //     const matchesDate =
  //       dateRange.from && dateRange.to
  //         ? eventDate.isAfter(dayjs(dateRange.from).startOf("day")) &&
  //         eventDate.isBefore(dayjs(dateRange.to).endOf("day"))
  //         : true;
  //     return matchesName && matchesCategory && matchesDate;
  //   });
  // }, [searchText, selectedCategory, dateRange, events]);

  // Chart data
  // const topEvents = useMemo(() => {
  //   return [...filteredEvents]
  //     .map((e) => ({
  //       name: e.name,
  //       count: parseInt(e.description.replace(/\D/g, ""), 10),
  //     }))
  //     .sort((a, b) => b.count - a.count)
  //     .slice(0, 5);
  // }, [filteredEvents]);

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-2xl font-semibold">📊 Event Analytics Dashboard</h2>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* <Input
          placeholder="🔍 Search event name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        /> */}

        {/* <Select
          onValueChange={setSelectedCategory}
          value={selectedCategory || undefined}
        >
          <SelectTrigger>
            <SelectValue placeholder="📂 Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange?.to ? (
                  <>
                    {format(dateRange.from, "MMM d, yyyy")} -{" "}
                    {format(dateRange.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d, yyyy")
                )
              ) : (
                <span>📅 Pick date range</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" className="p-0 w-auto">
            <div className="flex flex-col space-y-2 p-3">
              {/* Calendar */}
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />

              {/* Submit button */}
              <Button
                onClick={() => fetchData(dateRange)}
                // onClick={() => handleApplyDateRange()}
                className="w-full mt-2"
              >
                Apply Filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>

      </div>

      {/* Chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle>🔥 Top 5 Most Triggered Events</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topEvents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>📋 All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {dayjs(item.created_at).format("DD MMM YYYY, hh:mm A")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
