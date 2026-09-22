export interface TransactionProps {
  type: string;
  receiverPhone: string;
  amount: number;
  status: string;
  date: string;
}

export default function TransactionCard({ type, receiverPhone, amount, status, date }: TransactionProps) {
  return (
    <div className="flex justify-between items-center p-4 rounded-2xl border border-base-300 mb-3 bg-white">
      <div>
        <h3 className="font-semibold">{type}</h3>
        <p className="text-sm text-gray-500">{receiverPhone}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <div className="text-right">
        <h3 className="font-bold text-primary">৳{amount}</h3>
        <span className={`badge ${status === 'Success' ? 'badge-success' : 'badge-warning'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
