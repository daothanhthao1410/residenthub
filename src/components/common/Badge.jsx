const VARIANT_STYLES = {
  success: 'bg-success-light text-success',
  danger: 'bg-danger-light text-danger',
  warning: 'bg-warning-light text-warning',
  neutral: 'bg-bg text-muted border border-border',
  primary: 'bg-primary-light text-primary',
}

/**
 * Nhãn trạng thái nhỏ, dùng cho hóa đơn, yêu cầu hỗ trợ, hợp đồng...
 * variant: 'success' | 'danger' | 'warning' | 'neutral' | 'primary'
 */
export default function Badge({ children, variant = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </span>
  )
}
