import { Download } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import type { BillingInvoice } from "./BillingHistory";

interface BillingHistoryMobileProps {
    invoices: BillingInvoice[];

    onDownload?: (invoice: BillingInvoice) => void;

    getStatusStyles: (status: BillingInvoice["status"]) => string;

    currencyFormatter: Intl.NumberFormat;
}
//

export default function BillingHistoryMobile({ invoices, onDownload, getStatusStyles, currencyFormatter, }: BillingHistoryMobileProps) {
    return (
        <div className="divide-y md:hidden">
            {invoices.map((invoice) => (
                <article
                    key={invoice.id}
                    className="space-y-4 p-4"
                    aria-label={`Invoice ${invoice.invoiceNumber}`}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate font-medium">
                                {invoice.description}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {invoice.date}
                            </p>
                        </div>

                        <Badge
                            variant="outline"
                            className={getStatusStyles(invoice.status)}
                        >
                            {invoice.status}
                        </Badge>
                    </div>

                    <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="text-muted-foreground">
                                Amount
                            </dt>

                            <dd className="mt-1 font-medium">
                                {currencyFormatter.format(invoice.amount)}
                            </dd>
                        </div>

                        <div>
                            <dt className="text-muted-foreground">
                                Invoice Number
                            </dt>

                            <dd className="mt-1 font-medium truncate">
                                {invoice.invoiceNumber}
                            </dd>
                        </div>
                    </dl>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => onDownload?.(invoice)}
                    >
                        <Download className="mr-2 size-4" />

                        Download Invoice
                    </Button>
                </article>
            ))}
        </div>
    );
}