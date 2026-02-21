import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

export interface ConfirmDialog {
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    resolve?: (value: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts = signal<Toast[]>([]);
    confirmDialog = signal<ConfirmDialog | null>(null);
    private nextId = 0;

    success(message: string, duration = 3500) {
        this.addToast({ id: this.nextId++, message, type: 'success', duration });
    }

    error(message: string, duration = 4500) {
        this.addToast({ id: this.nextId++, message, type: 'error', duration });
    }

    warning(message: string, duration = 4000) {
        this.addToast({ id: this.nextId++, message, type: 'warning', duration });
    }

    info(message: string, duration = 3500) {
        this.addToast({ id: this.nextId++, message, type: 'info', duration });
    }

    dismiss(id: number) {
        this.toasts.update(list => list.filter(t => t.id !== id));
    }

    /** Returns a Promise<boolean> — true if user confirms, false if cancelled */
    confirm(message: string, options?: Partial<ConfirmDialog>): Promise<boolean> {
        return new Promise((resolve) => {
            this.confirmDialog.set({
                message,
                confirmText: options?.confirmText || 'Confirmer',
                cancelText: options?.cancelText || 'Annuler',
                type: options?.type || 'warning',
                resolve
            });
        });
    }

    resolveConfirm(result: boolean) {
        const dialog = this.confirmDialog();
        if (dialog?.resolve) dialog.resolve(result);
        this.confirmDialog.set(null);
    }

    private addToast(toast: Toast) {
        this.toasts.update(list => [...list, toast]);
        if (toast.duration) {
            setTimeout(() => this.dismiss(toast.id), toast.duration);
        }
    }
}
