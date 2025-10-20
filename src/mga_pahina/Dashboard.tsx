import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: -1000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 500,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: -2000,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: -250,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map(i => i.uv));
  const dataMin = Math.min(...data.map(i => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();


function Dashboard({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Card className="w-[600px] h-[600px] mx-5 mt-8">
          <CardHeader>
              <CardTitle>Company Productivity</CardTitle>
              <CardDescription>Chart Representing Company Stuff</CardDescription>
          </CardHeader>
          <CardContent className=" overflow-y-auto fill-mode-initial modal">
                <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                    isAnimationActive={isAnimationActive}
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                    label
                    isAnimationActive={isAnimationActive}
                  />
                </PieChart>
          </CardContent>
        </Card>
        <Card className="w-[600px] h-[600px] mx-5 mt-8">
          <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Total Financial Analytics</CardDescription>
          </CardHeader>
          <CardContent className=" overflow-y-auto fill-mode-initial modal">
            <AreaChart
              style={{
                width: '100%',
                maxWidth: '700px',
                maxHeight: '70vh',
                aspectRatio: 1.618,
              }}
              responsive
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width="auto" />
              <Tooltip />
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="green" stopOpacity={1} />
                  <stop offset={off} stopColor="green" stopOpacity={0.1} />
                  <stop offset={off} stopColor="red" stopOpacity={0.1} />
                  <stop offset="1" stopColor="red" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" />
            </AreaChart>
          </CardContent>
        </Card>
    </SidebarProvider>
    
  )
}

export default Dashboard
