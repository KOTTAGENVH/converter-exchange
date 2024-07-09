/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import Header from "@/src/components/header";
import Drawer from "@/src/components/drawer";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../global_redux/feature/drawe_slice";
import {
  deleteTransfer,
  getTransferHistory,
} from "../api/services/transferService";
import Chart from "chart.js/auto";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";

// Interface for row data
interface RowData {
  _id: string;
  date: string;
}

// Columns for the table
const getColumns = (deleteTransferHandler: (id: string) => void): MRT_ColumnDef<RowData>[] => [
  {
    accessorKey: "transferId",
    header: "Transfer ID",
    size: 150,
  },
  {
    accessorKey: "receiver",
    header: "Receiver",
    size: 150,
  },
  {
    accessorKey: "receiveremail",
    header: "Receiver Email",
    size: 150,
  },
  {
    accessorKey: "amountfrom",
    header: "Amount Before Conversion",
    size: 150,
  },
  {
    accessorKey: "currencyfrom",
    header: "Currency Before Conversion",
    size: 150,
  },
  {
    accessorKey: "amount",
    header: "Amount After Conversion",
    size: 150,
  },
  {
    accessorKey: "currency",
    header: "Currency After Conversion",
    size: 150,
  },
  {
    accessorKey: "note",
    header: "Note",
    size: 150,
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 150,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 150,
    Cell: ({ row }) => (
      <div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deleteTransferHandler(row.original._id)}
        >
          Revoke
        </button>
      </div>
    ),
  },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer.status);
  const user = useSelector((state: any) => state.user);

  // React query to get transfer history
  const { data, isLoading, error, isError } = useQuery("transferHistory", () =>
    getTransferHistory(user._id, user.email, user.token, user.refreshtoken)
  );

  // User logged validation
  useEffect(() => {
    if (!user || !user._id || !user.token || !user.refreshtoken) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  // Chart
  useEffect(() => {
    if (chartRef.current && data?.data) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const currencyCounts: { [key: string]: number } = {};
        data.data.forEach((item: any) => {
          if (currencyCounts[item.currency]) {
            currencyCounts[item.currency] += 1;
          } else {
            currencyCounts[item.currency] = 1;
          }
        });

        const labels = Object.keys(currencyCounts);
        const counts = Object.values(currencyCounts);

        const chart = new Chart(ctx, {
          type: "pie",
          data: {
            labels,
            datasets: [
              {
                label: "Currency Exchanged",
                data: counts,
                backgroundColor: ["red", "blue", "green", "orange", "purple", "yellow", "pink", "brown"],
              },
            ],
          },
        });

        return () => chart.destroy();
      }
    }
  }, [data?.data]);

  // Toggle drawer
  const toggleDrawer = () => {
    dispatch(setDrawer({ status: false }));
  };

  const deleteTransferHandler = async (id: string) => {
    try {
     await deleteTransfer(id, user?.email, user?.token, user?.refreshtoken).then (response => {
        alert("Transfer deleted successfully");
        window.location.reload();
      });
    }catch (error) {
      alert("Error deleting transfer");
    }
  };

  const columns = useMemo(() => getColumns(deleteTransferHandler), [deleteTransferHandler]);

  const table = useMaterialReactTable({
    columns,
    data: data?.data || [],
    enableColumnActions: false,
    enablePagination: true,
    muiTableContainerProps: {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
      },
    },
    muiPaginationProps: {
      rowsPerPageOptions: [2, 3],
    },
    initialState: {
      density: "compact",
      pagination: { pageSize: 3, pageIndex: 0 },
    },
    paginationDisplayMode: "pages",
  });

  if (loading || isLoading) {
    return (
      <div className="bg-white h-screen md:overflow-hidden">
        <Header />
        <Drawer isOpen={drawerState} toggleDrawer={toggleDrawer} />
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-transparent bg-opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white h-max ${loading ? "pointer-events-none" : ""} overflow-y-auto overflow-x-hidden`}>
      {(loading || isLoading) && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Header />
      <Drawer isOpen={drawerState} toggleDrawer={toggleDrawer} />
      <div className="h-screen w-screen bg-gradient-to-b from-cyan-50 to-blue-100">
        <div className="flex flex-col md:flex-row justify-evenly bg-slate-50 md:bg-transparent mb-4 md:flex-wrap w-full h-max">
          {user?.email && user?.firstName && user?.lastName ? (
            <div className="flex flex-col w-full md:w-1/2 justify-center p-6">
              <p className="text-xl md:text-2xl font-bold text-gray-800 bg-slate-50 md:m-8 rounded-3xl text-center p-6 md:shadow-xl">
                Name: {user.firstName} {user.lastName}
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-800 bg-slate-50 md:m-8 rounded-3xl text-center p-6 md:shadow-xl">
                Email: {user.email}
              </p>
            </div>
          ) : (
            <div className="text-left flex flex-col w-full md:w-1/4 justify-center bg-slate-50 m-4 rounded-3xl">
              <p className="text-left text-xl md:text-2xl font-bold text-gray-800">
                Name: No name found
              </p>
              <p className="text-left text-xl md:text-2xl font-bold text-gray-800">
                Email: No email found
              </p>
            </div>
          )}
          {data && data.data && data.data.length > 0 ? (
            <div className="text-left flex flex-col w-max md:w-1/4 justify-center bg-slate-50 m-4 rounded-3xl p-6 md:shadow-xl">
              <canvas ref={chartRef}></canvas>
            </div>
          ) : (
            <div className="text-left flex flex-col w-max md:w-1/4 justify-center bg-slate-50 m-4 rounded-3xl p-6 md:shadow-xl">
              <p>No data available to display the chart.</p>
            </div>
          )}
        </div>
        <div className="flex flex-1 overflow-y-auto overflow-x-hidden">
        <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
}
