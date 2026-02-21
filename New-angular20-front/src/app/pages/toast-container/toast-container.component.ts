import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast-container',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!-- Toast Notifications -->
        <div class="toast-stack">
            @for (toast of toastService.toasts(); track toast.id) {
                <div class="toast-item" [class]="'toast-' + toast.type"
                    (click)="toastService.dismiss(toast.id)">
                    <div class="toast-icon">
                        @switch (toast.type) {
                            @case ('success') { <i class="bi bi-check-circle-fill"></i> }
                            @case ('error') { <i class="bi bi-x-circle-fill"></i> }
                            @case ('warning') { <i class="bi bi-exclamation-triangle-fill"></i> }
                            @case ('info') { <i class="bi bi-info-circle-fill"></i> }
                        }
                    </div>
                    <span class="toast-msg">{{ toast.message }}</span>
                    <button class="toast-close" (click)="toastService.dismiss(toast.id)">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            }
        </div>

        <!-- Confirm Dialog Overlay -->
        @if (toastService.confirmDialog()) {
            <div class="confirm-backdrop" (click)="toastService.resolveConfirm(false)"></div>
            <div class="confirm-dialog" [class]="'confirm-' + toastService.confirmDialog()!.type">
                <div class="confirm-icon">
                    @switch (toastService.confirmDialog()!.type) {
                        @case ('danger') { <i class="bi bi-exclamation-triangle-fill"></i> }
                        @case ('warning') { <i class="bi bi-question-circle-fill"></i> }
                        @default { <i class="bi bi-question-circle-fill"></i> }
                    }
                </div>
                <p class="confirm-message">{{ toastService.confirmDialog()!.message }}</p>
                <div class="confirm-actions">
                    <button class="btn btn-sm rounded-pill px-4 btn-outline-secondary"
                        (click)="toastService.resolveConfirm(false)">
                        {{ toastService.confirmDialog()!.cancelText }}
                    </button>
                    <button class="btn btn-sm rounded-pill px-4"
                        [class.btn-danger]="toastService.confirmDialog()!.type === 'danger'"
                        [class.btn-warning]="toastService.confirmDialog()!.type === 'warning'"
                        [class.btn-primary]="toastService.confirmDialog()!.type === 'info'"
                        (click)="toastService.resolveConfirm(true)">
                        {{ toastService.confirmDialog()!.confirmText }}
                    </button>
                </div>
            </div>
        }
    `,
    styles: [`
        /* ── Toast Stack ── */
        .toast-stack {
            position: fixed;
            top: 90px;
            right: 1.5rem;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            max-width: 420px;
            width: calc(100% - 3rem);
        }

        .toast-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.25rem;
            border-radius: 14px;
            background: white;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
            border-left: 4px solid;
            animation: toastSlideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;

            &:hover {
                transform: translateX(-4px);
            }
        }

        .toast-success {
            border-color: #198754;
            .toast-icon { color: #198754; }
        }
        .toast-error {
            border-color: #dc3545;
            .toast-icon { color: #dc3545; }
        }
        .toast-warning {
            border-color: #ffc107;
            .toast-icon { color: #e6a800; }
        }
        .toast-info {
            border-color: #0056b3;
            .toast-icon { color: #0056b3; }
        }

        .toast-icon {
            font-size: 1.25rem;
            flex-shrink: 0;
        }

        .toast-msg {
            flex: 1;
            font-size: 0.9rem;
            font-weight: 500;
            color: #1a1a2e;
            line-height: 1.4;
        }

        .toast-close {
            background: none;
            border: none;
            color: #aaa;
            font-size: 0.8rem;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 6px;
            transition: all 0.2s;
            flex-shrink: 0;

            &:hover {
                background: rgba(0, 0, 0, 0.05);
                color: #333;
            }
        }

        @keyframes toastSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        /* ── Confirm Dialog ── */
        .confirm-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 10001;
            animation: fadeIn 0.2s ease;
        }

        .confirm-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10002;
            background: white;
            border-radius: 20px;
            padding: 2rem 2.5rem;
            min-width: 360px;
            max-width: 480px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            text-align: center;
            animation: confirmPop 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .confirm-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .confirm-danger .confirm-icon { color: #dc3545; }
        .confirm-warning .confirm-icon { color: #ffc107; }
        .confirm-info .confirm-icon { color: #0056b3; }

        .confirm-message {
            font-size: 1rem;
            font-weight: 500;
            color: #1a1a2e;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }

        .confirm-actions {
            display: flex;
            justify-content: center;
            gap: 0.75rem;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes confirmPop {
            from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `]
})
export class ToastContainerComponent {
    toastService = inject(ToastService);
}
