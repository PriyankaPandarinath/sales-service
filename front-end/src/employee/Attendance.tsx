import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  Timer,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';


import { attendanceAPI } from '@/lib/api';




/* ================= MOCK ATTENDANCE DATA ================= */

// const attendanceData = [
//   {
//     id: '1',
//     date: '2026-01-12',
//     inTime: '09:05',
//     outTime: '18:30',
//     totalHours: 9.42,
//     status: 'present',
//     lateBy: 5,
//     overtime: 30,
//   },
//   {
//     id: '2',
//     date: '2026-01-11',
//     inTime: '09:45',
//     outTime: '18:15',
//     totalHours: 8.5,
//     status: 'late',
//     lateBy: 45,
//     overtime: 15,
//   },
//   {
//     id: '3',
//     date: '2026-01-10',
//     inTime: '-',
//     outTime: '-',
//     totalHours: 0,
//     status: 'absent',
//     lateBy: 0,
//     overtime: 0,
//   },
//   {
//     id: '4',
//     date: '2026-01-09',
//     inTime: '-',
//     outTime: '-',
//     totalHours: 0,
//     status: 'on-leave',
//     lateBy: 0,
//     overtime: 0,
//   },
// ];


// const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
// const [loading, setLoading] = useState(false);


type AttendanceRecord = {
  id: number;
  date: string;
  punch_in?: string;
  punch_out?: string;
  total_hours: number;
  status: 'present' | 'absent' | 'late' | 'on-leave';
  late_minutes: number;
  overtime_minutes: number;
};





/* ================= STATS (UNCHANGED) ================= */

// const statsCards = [
//   {
//     title: 'Present',
//     value: '231',
//     percentage: '93.1%',
//     icon: CheckCircle2,
//     color: 'bg-success/10 text-success',
//   },
//   {
//     title: 'Absent',
//     value: '8',
//     percentage: '3.2%',
//     icon: XCircle,
//     color: 'bg-destructive/10 text-destructive',
//   },
//   {
//     title: 'Late Arrivals',
//     value: '12',
//     percentage: '4.8%',
//     icon: Timer,
//     color: 'bg-warning/10 text-warning',
//   },
//   {
//     title: 'On Leave',
//     value: '9',
//     percentage: '3.6%',
//     icon: Calendar,
//     color: 'bg-info/10 text-info',
//   },
// ];

/* ================= DATE FORMAT HELPER ================= */

const formatDateDDMMYYYY = (dateStr: string) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const calculateWorkingHours = (punchIn?: string, punchOut?: string) => {
  if (!punchIn || !punchOut) return '-';

  const [inH, inM] = punchIn.split(':').map(Number);
  const [outH, outM] = punchOut.split(':').map(Number);

  const inMinutes = inH * 60 + inM;
  const outMinutes = outH * 60 + outM;

  if (outMinutes <= inMinutes) return '-';

  const diffMinutes = outMinutes - inMinutes;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};


const Attendance: React.FC = () => {
  // const [selectedDate, setSelectedDate] = useState('');
  // const [statusFilter, setStatusFilter] = useState('all');

  const [selectedDate, setSelectedDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasPunchedInToday, setHasPunchedInToday] = useState(false);
const [hasPunchedOutToday, setHasPunchedOutToday] = useState(false);

//   const [stats, setStats] = useState({
//   PRESENT: 0,
//   ABSENT: 0,
//   LATE: 0,
//   ON_LEAVE: 0,
//   HALF_DAY: 0,
//   HOLIDAY: 0,
// });

const [stats, setStats] = useState<null | {
  PRESENT: number;
  ABSENT: number;
  LATE: number;
  ON_LEAVE: number;
  HALF_DAY: number;
  HOLIDAY: number;
}>(null);


  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;




  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchAttendance = async () => {
  try {
    setLoading(true);

    const response = await attendanceAPI.getMyAttendance({
      page,
      limit,
      status: statusFilter !== 'all' ? statusFilter : undefined,
    });

    setAttendanceData(response.data.items);

    // pick today's record if exists
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = response.data.items.find(
      (r: AttendanceRecord) => r.date === today
    );

    setHasPunchedInToday(response.data.TODAY_PUNCH_IN === true);
    setHasPunchedOutToday(response.data.TODAY_PUNCH_OUT === true);

    setTodayAttendance(todayRecord || null);

    setTotalPages(response.data.total_pages);
    setTotalRecords(response.data.total);
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to load attendance data',
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
};

const formatTime = (time?: string) => {
  if (!time) return '-';
  return time.slice(0, 5); // HH:MM
};


const fetchStats = async () => {
  try {
    const response = await attendanceAPI.getMyStats();
    setStats(response.data);
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to load attendance stats',
      variant: 'destructive',
    });
  }
};




useEffect(() => {
  fetchAttendance();
  fetchStats();
}, [page, statusFilter]);





  const { toast } = useToast();
  const { user } = useAuth();

  const handlePunchIn = async () => {
  try {
    await attendanceAPI.punchIn();

    toast({
      title: 'Punched In',
      description: 'Punch in recorded successfully',
    });

    fetchAttendance();
    fetchStats();
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Punch in failed',
      variant: 'destructive',
    });
  }
};

  const handlePunchOut = async () => {
    try {
      await attendanceAPI.punchOut();

      toast({
        title: 'Punched Out',
        description: 'Punch out recorded successfully',
      });

      fetchAttendance();
      fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Punch out failed',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="badge-success">Present</Badge>;
      case 'absent':
        return <Badge className="badge-destructive">Absent</Badge>;
      case 'late':
        return <Badge className="badge-warning">Late</Badge>;
      case 'on-leave':
        return <Badge variant="secondary">On Leave</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  /* ================= FILTER FIX ================= */

  const filteredData = attendanceData.filter((record) => {
    const matchesDate = selectedDate ? record.date === selectedDate : true;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track and manage daily attendance</p>
        </div>
        
      </div>

      {/* Punch In / Out */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Clock className="h-8 w-8 text-accent" />
              <div>
                <h2 className="text-xl font-semibold">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>
                <p className="text-3xl font-bold text-accent">
                  {new Date().toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handlePunchIn} className="bg-success hover:bg-success/90" 
              disabled={
                  loading ||
                  isWeekend ||
                  hasPunchedInToday
                }
                >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Punch In
              </Button>


              <Button onClick={handlePunchOut} className="bg-destructive hover:bg-destructive/90"
              disabled={
                  loading ||
                  isWeekend ||
                  !hasPunchedInToday ||
                  hasPunchedOutToday
                }
                >
                <XCircle className="h-4 w-4 mr-2" />
                Punch Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats (UNCHANGED) */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> */}

  {/* PRESENT */}
  {/* <Card className="card-hover">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Present</p>
          <p className="text-2xl font-bold mt-1">{stats.PRESENT}</p>
        </div>
        <div className="p-3 rounded-xl bg-success/10 text-success">
          <CheckCircle2 className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card> */}

  {/* ABSENT */}
  {/* <Card className="card-hover">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Absent</p>
          <p className="text-2xl font-bold mt-1">{stats.ABSENT}</p>
        </div>
        <div className="p-3 rounded-xl bg-destructive/10 text-destructive">
          <XCircle className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card> */}

  {/* LATE */}
  {/* <Card className="card-hover">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Late</p>
          <p className="text-2xl font-bold mt-1">{stats.LATE}</p>
        </div>
        <div className="p-3 rounded-xl bg-warning/10 text-warning">
          <Timer className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card> */}

  {/* ON LEAVE */}
  {/* <Card className="card-hover">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">On Leave</p>
          <p className="text-2xl font-bold mt-1">{stats.ON_LEAVE}</p>
        </div>
        <div className="p-3 rounded-xl bg-info/10 text-info">
          <Calendar className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card> */}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats === null ? (
    Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} className="card-hover">
        <CardContent className="p-6">
          <div className="h-6 w-24 bg-muted rounded mb-2 animate-pulse" />
          <div className="h-8 w-16 bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    ))
  ) : (
    <>
      {/* PRESENT */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Present</p>
          <p className="text-2xl font-bold mt-1">{stats.PRESENT}</p>
        </CardContent>
      </Card>

      {/* ABSENT */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Absent</p>
          <p className="text-2xl font-bold mt-1">{stats.ABSENT}</p>
        </CardContent>
      </Card>

      {/* LATE */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Late</p>
          <p className="text-2xl font-bold mt-1">{stats.LATE}</p>
        </CardContent>
      </Card>

      {/* ON LEAVE */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">On Leave</p>
          <p className="text-2xl font-bold mt-1">{stats.ON_LEAVE}</p>
        </CardContent>
      </Card>
    </>
  )}
</div>


{/* </div> */}


      {/* <Card> */}
  {/* <CardHeader className="pb-2">
    <CardTitle className="text-base font-semibold">
      Filter Attendance
    </CardTitle>
  </CardHeader> */}

  {/* <CardContent className="p-4"> */}
    {/* <div className="flex flex-col sm:flex-row sm:items-end gap-3"> */}
      
      {/* Date Filter */}
      {/* <div className="flex flex-col gap-1"> */}
        {/* <label className="text-xs text-muted-foreground"> */}
          {/* Date */}
        {/* </label> */}
        {/* <Input */}
          {/* type="date" */}
          {/* value={selectedDate} */}
          {/* onChange={(e) => setSelectedDate(e.target.value)} */}
          {/* className="w-full sm:w-[160px]" */}
        {/* /> */}
      {/* </div> */}

      {/* Status Filter */}
      {/* <div className="flex flex-col gap-1"> */}
        {/* <label className="text-xs text-muted-foreground"> */}
          {/* Status */}
        {/* </label> */}
        {/* <Select value={statusFilter} onValueChange={setStatusFilter}> */}
          {/* <SelectTrigger className="w-full sm:w-[150px]"> */}
            {/* <SelectValue placeholder="All Status" /> */}
          {/* </SelectTrigger> */}
          {/* <SelectContent> */}
            {/* <SelectItem value="all">All Status</SelectItem> */}
            {/* <SelectItem value="PRESENT">Present</SelectItem> */}
            {/* <SelectItem value="ABSENT">Absent</SelectItem> */}
            {/* <SelectItem value="LATE">Late</SelectItem> */}
            {/* <SelectItem value="ON_LEAVE">On Leave</SelectItem> */}
          {/* </SelectContent> */}
        {/* </Select> */}
      {/* </div> */}

      {/* Clear Button */}
      {/* {selectedDate && ( */}
        {/* <Button */}
          {/* variant="ghost" */}
          {/* size="sm" */}
          {/* className="self-start sm:self-end" */}
          {/* onClick={() => setSelectedDate('')} */}
        {/* > */}
          {/* Clear */}
        {/* </Button> */}
      {/* )} */}
    {/* </div> */}
  {/* </CardContent> */}
{/* </Card> */}


      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance Register</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>In Time</TableHead>
                  <TableHead>Out Time</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Late By</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                                {/* {loading && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading attendance...
                    </TableCell>
                  </TableRow>
                )} */}
                {!loading && filteredData.length === 0 && (
  <TableRow>
    <TableCell colSpan={7} className="text-center text-muted-foreground">
      No attendance records found
    </TableCell>
  </TableRow>
)}



                {filteredData.map((record) => {
                  const day = new Date(record.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                  });

                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <p className="font-medium">
                          {formatDateDDMMYYYY(record.date)}
                        </p>
                        <p className="text-sm text-muted-foreground">{day}</p>
                      </TableCell>
                      <TableCell>{formatTime(record.punch_in)}</TableCell>
                      <TableCell>{formatTime(record.punch_out)}</TableCell>
                      <TableCell>
                        {/* {record.total_hours > 0
                          ? `${parseInt(record.punch_out.substring(0, 2)) - parseInt(record.punch_in.substring(0, 2))}h`
                          : '-'} */}
                          {/* <TableCell> */}
  {calculateWorkingHours(record.punch_in, record.punch_out)}
{/* </TableCell> */}
                      </TableCell>
                      <TableCell>
                        {record.late_minutes > 0 ? (
                          <span className="text-warning">{record.late_minutes} min</span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {record.overtime_minutes > 0 ? (
                          <span className="text-success">{record.overtime_minutes} min</span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              Showing page {page} of {totalPages} ({totalRecords} records)
            </span>
            <div className="flex gap-2">
              <Button
  variant="outline"
  size="sm"
  disabled={loading || page === 1}
  onClick={() => setPage((p) => p - 1)}
>
  <ChevronLeft className="h-4 w-4 mr-1" />
  Previous
</Button>

<Button
  variant="outline"
  size="sm"
  disabled={loading || page === totalPages}
  onClick={() => setPage((p) => p + 1)}
>
  Next
  <ChevronRight className="h-4 w-4 ml-1" />
</Button>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
