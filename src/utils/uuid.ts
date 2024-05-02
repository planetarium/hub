export function uuidv4ToBuffer(uuid: string): Buffer {
  const source = Buffer.from(uuid.replace(/-/g, ""), "hex");
  const buffer = new Buffer(16);

  // Match byte-order.
  buffer[0] = source[3];
  buffer[1] = source[2];
  buffer[2] = source[1];
  buffer[3] = source[0];
  buffer[4] = source[5];
  buffer[5] = source[4];
  buffer[6] = source[7];
  buffer[7] = source[6];

  source.copy(buffer, 8, 8, 16);

  return buffer;
}
