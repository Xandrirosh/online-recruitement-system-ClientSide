import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

export default function InterviewReport() {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH REPORTS
  const fetchReports = async () => {

    try {

      setLoading(true);

      const response = await Axios({
        ...summaryApi.getInterviewReport,
        withCredentials: true,
      });

      if (response.data.success) {
        setReports(response.data.data);
      }

    } catch (error) {

      console.log(
        "Interview Report Error:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // PDF EXPORT
  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text(
      "Interview Schedule Report",
      14,
      15
    );

    const tableData = reports.map((item) => [

      item.applicantId?.name || "N/A",

      item.jobId?.title || "N/A",

      new Date(
        item.interviewDate
      ).toLocaleDateString(),

      item.interviewTime || "N/A",

      item.status || "N/A",
    ]);

    autoTable(doc, {

      startY: 25,

      head: [[
        "Applicant",
        "Job Title",
        "Interview Date",
        "Interview Time",
        "Status",
      ]],

      body: tableData,
    });

    doc.save("Interview_Report.pdf");
  };

  // EXCEL EXPORT
  const exportExcel = () => {

    const data = reports.map((item) => ({

      Applicant:
        item.applicantId?.name || "N/A",

      Job:
        item.jobId?.title || "N/A",

      Date:
        new Date(
          item.interviewDate
        ).toLocaleDateString(),

      Time:
        item.interviewTime || "N/A",

      Status:
        item.status || "N/A",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Interview Report"
    );

    XLSX.writeFile(
      workbook,
      "Interview_Report.xlsx"
    );
  };

  return (

    <div className="p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Interview Schedule Report
        </h1>

        <div className="flex gap-3">

          <button
            onClick={exportPDF}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Export PDF
          </button>

          <button
            onClick={exportExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Export Excel
          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white shadow rounded-lg overflow-x-auto">

        <table className="w-full text-sm border-collapse">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Applicant
              </th>

              <th className="p-3 text-left">
                Job Title
              </th>

              <th className="p-3 text-left">
                Interview Date
              </th>

              <th className="p-3 text-left">
                Interview Time
              </th>

              <th className="p-3 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan={5}
                  className="text-center p-6"
                >
                  Loading reports...
                </td>
              </tr>

            ) : reports.length > 0 ? (

              reports.map((item) => (

                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">
                    {item.applicantId?.name}
                  </td>

                  <td className="p-3">
                    {item.jobId?.title}
                  </td>

                  <td className="p-3">
                    {new Date(
                      item.interviewDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {item.interviewTime}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium

                                            ${item.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"

                          : item.status === "Completed"
                            ? "bg-green-100 text-green-700"

                            : "bg-red-100 text-red-700"
                        }
                                            `}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>
              ))

            ) : (

              <tr>

                <td
                  colSpan={5}
                  className="text-center p-6 text-gray-500"
                >
                  No interview schedules found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}