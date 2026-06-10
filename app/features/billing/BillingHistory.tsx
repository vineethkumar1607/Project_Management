import { Download, FileText } from "lucide-react";
import EmptyState from "~/components/common/EmptyState";
import BillingHistoryMobile from "./BillingHistoryMobile";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "~/components/ui/table";
import { BILLING_TABLE_COLUMNS } from "./billingConfig";

type BillingInvoiceStatus = | "PAID" | "FAILED" | "REFUNDED";

export interface BillingInvoice {
    id: string;
    invoiceNumber: string;
    date: string;
    description: string;
    amount: number;
    currency: string;
    status: BillingInvoiceStatus;
}

interface BillingHistoryProps {
    invoices: BillingInvoice[];

    onDownload?: (invoice: BillingInvoice) => void;

    onViewAll?: () => void;
}

const currencyFormatter = new Intl.NumberFormat(
    "en-IN", { style: "currency", currency: "INR", });

function getStatusStyles(status: BillingInvoiceStatus) {

    switch (status) {
        case "PAID":
            return "border-green-200 bg-green-50 text-green-700";

        case "FAILED":
            return "border-red-200 bg-red-50 text-red-700";

        case "REFUNDED":
            return "border-amber-200 bg-amber-50 text-amber-700";

        default:
            return "";
    }
}

export default function BillingHistory({ invoices, onDownload, onViewAll, }: BillingHistoryProps) {


    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b pb-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-amber-100 p-2">
                        <FileText className="size-5 text-amber-600" />
                    </div>

                    <div>
                        <CardTitle>
                            Billing History
                        </CardTitle>
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onViewAll}
                    disabled={invoices.length === 0}
                >
                    View All Invoices
                </Button>
            </CardHeader>

            <CardContent className="p-0">
                {/* Desktop */}
                <div className="hidden md:block overflow-x-auto">
                    <Table className="table-fixed">
                        <caption className="sr-only">
                            Workspace billing
                            history
                        </caption>

                        <TableHeader>
                            <TableRow>
                                {BILLING_TABLE_COLUMNS.map((column) => (
                                    <TableHead
                                        key={column.key}
                                        scope="col"
                                        className={column.className}
                                    >
                                        {column.label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {invoices.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-80">
                                        <EmptyState
                                            icon={<FileText className="size-8 text-muted-foreground" />}
                                            title="No billing History yet"
                                            description="Your payment history will appear here once you subscribe to a paid plan."
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="pl-6">
                                            {invoice.date}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {invoice.description}
                                        </TableCell>

                                        <TableCell>
                                            {currencyFormatter.format(invoice.amount)}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={getStatusStyles(invoice.status)}
                                            >
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="font-mono text-sm text-muted-foreground">
                                            {invoice.invoiceNumber}
                                        </TableCell>

                                        <TableCell className="pr-6 text-right">
                                            <Button
                                               variant="outline"
                                                size="sm"
                                                onClick={() => onDownload?.(invoice)}
                                                aria-label={`Download invoice ${invoice.invoiceNumber}`}
                                            >
                                                <Download className="mr-2 size-4" />

                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile */}
                {invoices.length === 0 ? (
                    <div className="py-8 md:hidden">
                        <EmptyState
                            icon={<FileText className="size-8  text-amber-600" />}
                            title="No billing History yet"
                            description="Your payment history will appear here once you subscribe to a paid plan."
                        />
                    </div>
                ) : (
                    <BillingHistoryMobile
                        invoices={invoices}
                        onDownload={onDownload}
                        getStatusStyles={getStatusStyles}
                        currencyFormatter={currencyFormatter}
                    />
                )}
            </CardContent>
        </Card>
    );
}



