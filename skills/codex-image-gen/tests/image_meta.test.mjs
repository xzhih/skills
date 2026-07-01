import test from "node:test";
import assert from "node:assert/strict";
import { readImageMetadata } from "../scripts/lib/image_meta.mjs";

test("reads PNG IHDR dimensions", () => {
  const buffer = Buffer.alloc(24);
  buffer[0] = 0x89;
  buffer.write("PNG", 1, "ascii");
  buffer.write("IHDR", 12, "ascii");
  buffer.writeUInt32BE(2048, 16);
  buffer.writeUInt32BE(1152, 20);
  assert.deepEqual(readImageMetadata(buffer), { format: "png", width: 2048, height: 1152 });
});

test("reads JPEG SOF dimensions", () => {
  const buffer = Buffer.from([
    0xff, 0xd8,
    0xff, 0xe0, 0x00, 0x04, 0x00, 0x00,
    0xff, 0xc0, 0x00, 0x0b, 0x08,
    0x04, 0x80,
    0x08, 0x00,
    0x01, 0x01, 0x11, 0x00,
    0xff, 0xd9,
  ]);
  assert.deepEqual(readImageMetadata(buffer), { format: "jpeg", width: 2048, height: 1152 });
});

test("reads WebP VP8X dimensions", () => {
  const buffer = Buffer.alloc(30);
  buffer.write("RIFF", 0, "ascii");
  buffer.write("WEBP", 8, "ascii");
  buffer.write("VP8X", 12, "ascii");
  buffer.writeUInt32LE(10, 16);
  writeUInt24LE(buffer, 24, 2048 - 1);
  writeUInt24LE(buffer, 27, 1152 - 1);
  assert.deepEqual(readImageMetadata(buffer), { format: "webp", width: 2048, height: 1152 });
});

test("unknown buffer does not throw", () => {
  assert.deepEqual(readImageMetadata(Buffer.from("not image")), { format: "unknown", width: null, height: null });
});

function writeUInt24LE(buffer, offset, value) {
  buffer[offset] = value & 0xff;
  buffer[offset + 1] = (value >> 8) & 0xff;
  buffer[offset + 2] = (value >> 16) & 0xff;
}
