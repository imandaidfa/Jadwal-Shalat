import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { startIqomah, iqDurations, motivations } from './iqomah.js';

describe('Iqomah Logic', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should start with correct duration for Maghrib', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        startIqomah('Maghrib', onUpdate, onComplete);

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            timeLeft: iqDurations.Maghrib * 60
        }));
    });

    it('should update every second', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        startIqomah('Maghrib', onUpdate, onComplete);

        vi.advanceTimersByTime(1000);
        expect(onUpdate).toHaveBeenLastCalledWith(expect.objectContaining({
            timeLeft: (iqDurations.Maghrib * 60) - 1
        }));
    });

    it('should call onComplete when timer reaches zero', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        // Use short duration for test (default is 10 min if not matched, but let's use a known one)
        const durationInSeconds = iqDurations.Maghrib * 60;

        startIqomah('Maghrib', onUpdate, onComplete);

        vi.advanceTimersByTime(durationInSeconds * 1000);

        expect(onComplete).toHaveBeenCalled();
    });

    it('should show a random motivation at start', () => {
        const onUpdate = vi.fn();
        const onComplete = vi.fn();

        startIqomah('Subuh', onUpdate, onComplete);

        const callArgs = onUpdate.mock.calls[0][0];
        expect(motivations).toContain(callArgs.motivation);
    });
});
