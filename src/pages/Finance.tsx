import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BadgeDollarSign,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  TrendingUp,
} from "lucide-react";

const DIVIDEND_SUMMARY = {
  totalEarned: 18_450.0,
  ytd: 3_250.0,
  shares: 1_240,
  ratePercent: 8.5,
  status: "Active",
  memberSince: "2018",
};

const DIVIDEND_HISTORY = [
  { year: 2024, amount: 3_250.0, shares: 1_240, rate: 8.5, status: "Paid" },
  { year: 2023, amount: 2_980.0, shares: 1_180, rate: 8.0, status: "Paid" },
  { year: 2022, amount: 2_640.0, shares: 1_100, rate: 7.5, status: "Paid" },
  { year: 2021, amount: 2_380.0, shares: 1_050, rate: 7.0, status: "Paid" },
  { year: 2020, amount: 2_100.0, shares: 980, rate: 6.5, status: "Paid" },
  { year: 2019, amount: 1_900.0, shares: 900, rate: 6.0, status: "Paid" },
  { year: 2018, amount: 1_200.0, shares: 700, rate: 5.5, status: "Paid" },
];

const DIVIDEND_SCHEDULE = [
  {
    event: "Board Declaration",
    date: "March 28, 2025",
    notes: "Annual meeting & rate approval",
    done: false,
  },
  {
    event: "Record Date",
    date: "April 10, 2025",
    notes: "Eligibility snapshot date",
    done: false,
  },
  {
    event: "Payout Date",
    date: "May 5, 2025",
    notes: "Credited to member accounts",
    done: false,
  },
  {
    event: "2024 Payout",
    date: "May 6, 2024",
    notes: "₱3,250.00 released",
    done: true,
  },
];

function peso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(value);
}

function StatPill({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg px-4 py-3 ${
        accent ? "bg-primary/10" : "bg-muted"
      }`}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-semibold ${accent ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function Finance() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Dividends</h1>

      <Card className="bg-linear-to-br from-primary/90 to-primary text-primary-foreground ring-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-primary-foreground/80 text-xs uppercase tracking-widest font-semibold">
                Total Dividends Earned
              </CardTitle>
              <p className="text-3xl font-bold mt-1">
                {peso(DIVIDEND_SUMMARY.totalEarned)}
              </p>
            </div>
            <div className="rounded-full bg-white/20 p-3">
              <BadgeDollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center rounded-lg bg-white/15 px-2 py-3">
              <span className="text-xs text-white/70">YTD 2024</span>
              <span className="text-sm font-semibold text-white">
                {peso(DIVIDEND_SUMMARY.ytd)}
              </span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white/15 px-2 py-3">
              <span className="text-xs text-white/70">Shares</span>
              <span className="text-sm font-semibold text-white">
                {DIVIDEND_SUMMARY.shares.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white/15 px-2 py-3">
              <span className="text-xs text-white/70">Rate</span>
              <span className="text-sm font-semibold text-white">
                {DIVIDEND_SUMMARY.ratePercent}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex flex-col gap-3 mt-3">
          <div className="grid grid-cols-2 gap-2">
            <StatPill
              label="Member Since"
              value={DIVIDEND_SUMMARY.memberSince}
            />
            <StatPill label="Status" value={DIVIDEND_SUMMARY.status} accent />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Year Dividend</CardTitle>
              <CardDescription>Fiscal Year 2024 breakdown</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
              <InfoRow
                label="Declared Rate"
                value={`${DIVIDEND_SUMMARY.ratePercent}% per annum`}
                highlight
              />
              <InfoRow
                label="Total Shares"
                value={DIVIDEND_SUMMARY.shares.toLocaleString()}
              />
              <InfoRow
                label="Computed Dividend"
                value={peso(DIVIDEND_SUMMARY.ytd)}
                highlight
              />
              <InfoRow label="Declaration Date" value="March 30, 2024" />
              <InfoRow label="Payout Date" value="May 6, 2024" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <CardTitle>Dividend Growth</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-1 h-16">
                {DIVIDEND_HISTORY.slice()
                  .reverse()
                  .map((d) => {
                    const max = Math.max(
                      ...DIVIDEND_HISTORY.map((h) => h.amount)
                    );
                    const pct = (d.amount / max) * 100;
                    return (
                      <div
                        key={d.year}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div
                          className="w-full rounded-sm bg-primary/70 transition-all"
                          style={{ height: `${pct}%` }}
                        />
                        <span className="text-[9px] text-muted-foreground truncate w-full text-center">
                          {String(d.year).slice(2)}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-right">
                2018 – 2024
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>All released dividend payments</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 px-0">
              {DIVIDEND_HISTORY.map((d, idx) => (
                <div
                  key={d.year}
                  className={`flex items-center justify-between px-4 py-3 ${
                    idx !== DIVIDEND_HISTORY.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">FY {d.year}</span>
                    <span className="text-xs text-muted-foreground">
                      {d.shares.toLocaleString()} shares · {d.rate}% rate
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-primary">
                        {peso(d.amount)}
                      </span>
                      <span className="text-xs text-green-600 flex items-center gap-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        {d.status}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-3 flex flex-col gap-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <CardTitle>Dividend Schedule</CardTitle>
              </div>
              <CardDescription>FY 2025 upcoming milestones</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {DIVIDEND_SCHEDULE.map((item) => (
                <div key={item.event} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        item.done
                          ? "border-green-500 bg-green-500"
                          : "border-primary bg-primary/10"
                      }`}
                    >
                      {item.done ? (
                        <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                      ) : (
                        <Clock className="h-2.5 w-2.5 text-primary" />
                      )}
                    </div>
                    <div className="mt-1 w-px flex-1 bg-border" />
                  </div>
                  <div className="pb-4 flex-1">
                    <p
                      className={`text-sm font-medium ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                    >
                      {item.event}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {item.date}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.notes}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="rounded-lg bg-accent px-4 py-3 flex gap-2 items-start">
            <Calendar className="h-4 w-4 text-accent-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-accent-foreground">
              Dividend rates are approved annually at the General Assembly
              meeting. Eligibility is determined by your active share balance on
              the record date.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
