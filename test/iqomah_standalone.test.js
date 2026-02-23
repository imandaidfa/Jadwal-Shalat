import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { startIqomah, iqDurations, motivations } from '../js/iqomah.js';

describe('Iqomah Standalone Logic', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should initialize with correct duration for Subuh', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        startIqomah('Subuh', onUpdate, onComplete);

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            timeLeft: iqDurations.Subuh * 60
        }));
    });

    it('should update time left every second', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        startIqomah('Dzuhur', onUpdate, onComplete);

        vi.advanceTimersByTime(1000);
        expect(onUpdate).toHaveBeenLastCalledWith({
            timeLeft: (iqDurations.Dzuhur * 60) - 1
        });
    });

    it('should trigger onComplete after full duration', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();
        const durationInSeconds = iqDurations.Ashar * 60;

        startIqomah('Ashar', onUpdate, onComplete);

        vi.advanceTimersByTime(durationInSeconds * 1000);
        expect(onComplete).toHaveBeenCalled();
    });

    it('should provide a valid random motivation from the list', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        startIqomah('Isya', onUpdate, onComplete);

        const callArgs = onUpdate.mock.calls[0][0];
        expect(motivations).toContain(callArgs.motivation);
    });

    it('should handle missing prayer names with default 10 minutes', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        startIqomah('UnknownPrayer', onUpdate, onComplete);

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            timeLeft: 10 * 60
        }));
    });
});
