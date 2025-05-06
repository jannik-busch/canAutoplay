import { testAutoplay } from '../src/index';

describe('test-autoplay', () => {
  let originalCreateElement: typeof document.createElement;
  let cachedResult: boolean | null = null;

  beforeAll(() => {
    originalCreateElement = document.createElement;
  });

  afterAll(() => {
    document.createElement = originalCreateElement;
    cachedResult = null;
  });

  it('should resolve true when video can autoplay with sound', async () => {
    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return {
          play: jest.fn().mockResolvedValue(undefined),
          addEventListener: jest.fn((event, callback) => {
            if (event === 'canplaythrough') {
              callback();
            }
          }),
          remove: jest.fn(),
          src: '',
          autoplay: false,
          muted: false,
          playsInline: true,
          volume: 0.0001,
        };
      }
      return originalCreateElement(tagName);
    });

    const result = await testAutoplay();
    expect(result).toBe(true);
  });

  it('should resolve true when video can autoplay with sound and cached result is true', async () => {
    cachedResult = true;
    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return {
          play: jest.fn().mockResolvedValue(undefined),
          addEventListener: jest.fn((event, callback) => {
            if (event === 'canplaythrough') {
              callback();
            }
          }),
          remove: jest.fn(),
          src: '',
          autoplay: false,
          muted: false,
          playsInline: true,
          volume: 0.0001,
        };
      }
      return originalCreateElement(tagName);
    });

    const result = await testAutoplay();
    expect(result).toBe(true);
  });

it('should resolve true when video can autoplay with sound and cached result is false', async () => {
    cachedResult = false;
    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return {
          play: jest.fn().mockResolvedValue(undefined),
          addEventListener: jest.fn((event, callback) => {
            if (event === 'canplaythrough') {
              callback();
            }
          }),
          remove: jest.fn(),
          src: '',
          autoplay: false,
          muted: false,
          playsInline: true,
          volume: 0.0001,
        };
      }
      return originalCreateElement(tagName);
    });

    const result = await testAutoplay();
    expect(result).toBe(true);
  });

  it('should resolve true when cached result is true and useCachedResult is true', async () => {
    cachedResult = true;    
    const result = await testAutoplay({ useCachedResult: true });
    expect(result).toBe(true);
  });

  it('should resolve true when cached result is true and useCachedResultIfTrue is true', async () => {
    cachedResult = true;
    const result = await testAutoplay({ useCachedResultIfTrue: true });
    expect(result).toBe(true);
  });

  it('should resolve false when video cannot autoplay with sound', async () => {
    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return {
          play: jest.fn().mockRejectedValue(new Error('Autoplay failed')),
          addEventListener: jest.fn(),
          remove: jest.fn(),
          src: '',
          autoplay: false,
          muted: false,
          playsInline: true,
          volume: 0.0001,
        };
      }
      return originalCreateElement(tagName);
    });

    const result = await testAutoplay();
    expect(result).toBe(false);
  });

  it('should resolve false when video play fn times out', async () => {
    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return {
          play: jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 9999))),
          addEventListener: jest.fn(),
          remove: jest.fn(),
          src: '',
          autoplay: false,
          muted: false,
          playsInline: true,
          volume: 0.0001,
        };
      }
      return originalCreateElement(tagName);
    });

    const result = await testAutoplay();
    expect(result).toBe(false);
  });

  it('should resolve false when video element is invalid', async () => {
    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return null; // Simulate invalid video element
      }
      return originalCreateElement(tagName);
    });

    const result = await testAutoplay();
    expect(result).toBe(false);
  });

  it('should resolve false when promise times out', async () => {
    document.createElement = jest.fn().mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return {
          play: jest.fn(),
          addEventListener: jest.fn(),
          remove: jest.fn(),
          src: '',
          autoplay: false,
          muted: false,
          playsInline: true,
          volume: 0.0001,
        };
      }
      return originalCreateElement(tagName);
    });

    jest.useFakeTimers();
    const autoplayPromise = testAutoplay();
    jest.advanceTimersByTime(2000); // Simulate timeout
    const result = await autoplayPromise;
    expect(result).toBe(false);
    jest.useRealTimers();
  });
});