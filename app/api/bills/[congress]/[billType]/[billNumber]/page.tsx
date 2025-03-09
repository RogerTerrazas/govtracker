"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface BillDetail {
  title: string;
  congress: number;
  originChamber: string;
  latestAction: { actionDate: string; text: string };
  introducedDate: string;
  sponsors: { fullName: string; party: string; state: string }[];
  laws?: { number: string; type: string }[];
  policyArea?: { name: string };
}

export default function BillDetailsPage() {
  const { congress, billType, billNumber } = useParams();
  const [bill, setBill] = useState<BillDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const res = await fetch(
          `/api/bills/${congress}/${billType}/${billNumber}`
        );
        const data = await res.json();
        setBill(data);
      } catch (error) {
        console.error("Error fetching bill details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [congress, billType, billNumber]);

  if (loading) {
    return <p className="text-center mt-10">Loading bill details...</p>;
  }

  if (!bill) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load bill details.
      </p>
    );
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">{bill.title}</h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          <p>
            <strong>Congress:</strong> {bill.congress}
          </p>
          <p>
            <strong>Chamber:</strong> {bill.originChamber}
          </p>
          <p>
            <strong>Introduced Date:</strong> {bill.introducedDate}
          </p>
          <p>
            <strong>Latest Action:</strong> {bill.latestAction.text} (
            {bill.latestAction.actionDate})
          </p>
          {bill.policyArea && (
            <p>
              <strong>Policy Area:</strong> {bill.policyArea.name}
            </p>
          )}
          {bill.sponsors?.length > 0 && (
            <div>
              <strong>Sponsors:</strong>
              <ul className="list-disc list-inside">
                {bill.sponsors.map((sponsor, index) => (
                  <li key={index}>
                    {sponsor.fullName} ({sponsor.party} - {sponsor.state})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {bill.laws?.length ? (
            <div>
              <strong>Laws Passed:</strong>
              <ul className="list-disc list-inside">
                {bill.laws.map((law, index) => (
                  <li key={index}>
                    {law.type} {law.number}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>
              <strong>Laws Passed:</strong> No laws available
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
