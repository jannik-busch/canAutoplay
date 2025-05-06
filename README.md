# testAutoplay

`testAutoplay` is a JavaScript module designed to test if a video can autoplay with sound capabilities in a browser environment. This package is useful for developers who need to determine autoplay support for videos in their web applications.

## Installation

To install `testAutoplay`, use npm:

```bash
npm install test-autoplay
```

## Usage

Here's a basic example of how to use the `testAutoplay` function:

```javascript
import { testAutoplay } from 'test-autoplay';

(async () => {
  const canPlay = await testAutoplay();
  console.log(`Can autoplay with sound: ${canPlay}`);
})();
```

### Options

The `testAutoplay` function accepts an optional configuration object with the following properties:

- `useCachedResult`: (boolean) If true, returns the cached result if available.
- `useCachedResultIfTrue`: (boolean) If true, returns true if the cached result is true.
- `useCachedResultIfFalse`: (boolean) If true, returns false if the cached result is false.

Example with options:

```javascript
const options = {
  useCachedResult: true,
  useCachedResultIfTrue: false,
  useCachedResultIfFalse: false,
};

const canPlay = await testAutoplay(options);
```

## Development

### Build

To build the project, run:

```bash
npm run build
```

### Test

To run tests, use:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Jannik Busch

---

Feel free to modify this draft to better fit your project's specifics or add any additional information you think might be useful for users. If you need further customization or additional sections, let me know!
