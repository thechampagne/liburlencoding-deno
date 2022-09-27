let libname = "./liburlencoding.so";
if (Deno.build.os === "windows") {
  libname = "./liburlencoding.dll";
} else if (Deno.build.os === "darwin") {
  libname = "./liburlencoding.dylib";
}

const lib = Deno.dlopen(libname, {
  url_encoding_encode: {
    parameters: ["pointer"],
    result: "pointer"
  },
  url_encoding_encode_binary: {
    parameters: ["pointer", "usize"],
    result: "pointer"
  },
  url_encoding_decode: {
    parameters: ["pointer"],
    result: "pointer"
  },
  url_encoding_decode_binary: {
    parameters: ["pointer", "usize"],
    result: "pointer"
  },
  url_encoding_free: {
    parameters: ["pointer"],
    result: "void"
  }
});

export function encode(data: string): string {
  const encoder = new TextEncoder();
  const res = lib.symbols.url_encoding_encode(encoder.encode(data));
  if (res == null) {
    return "";
  }
  const str = new Deno.UnsafePointerView(res).getCString();
  lib.symbols.url_encoding_free(res);
  return str;
}

export function encodeBinary(data: string): string {
  const encoder = new TextEncoder();
  const res = lib.symbols.url_encoding_encode_binary(encoder.encode(data), data.length);
  if (res == null) {
    return "";
  }
  const str = new Deno.UnsafePointerView(res).getCString();
  lib.symbols.url_encoding_free(res);
  return str;
}

export function decode(data: string): string {
  const encoder = new TextEncoder();
  const res = lib.symbols.url_encoding_decode(encoder.encode(data));
  if (res == null) {
    return "";
  }
  const str = new Deno.UnsafePointerView(res).getCString();
  lib.symbols.url_encoding_free(res);
  return str;
}

export function decodeBinary(data: string): string {
  const encoder = new TextEncoder();
  const res = lib.symbols.url_encoding_decode_binary(encoder.encode(data), data.length);
  if (res == null) {
    return "";
  }
  const str = new Deno.UnsafePointerView(res).getCString();
  lib.symbols.url_encoding_free(res);
  return str;
}