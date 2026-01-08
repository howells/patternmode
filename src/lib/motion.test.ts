import { describe, it, expect } from 'vitest';
import { easings, getEasing, transition, springs } from './motion';

describe('motion utilities', () => {
  describe('easings', () => {
    it('should have correct Apple easing values', () => {
      expect(easings.standard).toEqual([0.4, 0.0, 0.2, 1.0]);
      expect(easings.deceleration).toEqual([0.0, 0.0, 0.2, 1.0]);
      expect(easings.acceleration).toEqual([0.4, 0.0, 1.0, 1.0]);
      expect(easings.sharp).toEqual([0.4, 0.0, 0.6, 1.0]);
    });
  });

  describe('getEasing', () => {
    it('should return correct easing by name', () => {
      expect(getEasing('standard')).toBe(easings.standard);
      expect(getEasing('deceleration')).toBe(easings.deceleration);
      expect(getEasing('acceleration')).toBe(easings.acceleration);
      expect(getEasing('sharp')).toBe(easings.sharp);
    });
  });

  describe('transition', () => {
    it('should create transition with correct structure', () => {
      const result = transition('standard', 0.5);
      expect(result).toEqual({
        duration: 0.5,
        ease: easings.standard
      });
    });

    it('should use default duration of 0.3', () => {
      expect(transition('standard').duration).toBe(0.3);
    });

    it('should work with all easing types', () => {
      expect(transition('deceleration').ease).toBe(easings.deceleration);
      expect(transition('acceleration').ease).toBe(easings.acceleration);
      expect(transition('sharp').ease).toBe(easings.sharp);
    });
  });

  describe('springs', () => {
    it('should have correct spring configurations', () => {
      expect(springs.magnetic).toEqual({
        type: 'spring',
        stiffness: 300,
        damping: 30
      });
      expect(springs.bouncy).toEqual({
        type: 'spring',
        stiffness: 400,
        damping: 25
      });
      expect(springs.smooth).toEqual({
        type: 'spring',
        stiffness: 200,
        damping: 40
      });
    });
  });
});
