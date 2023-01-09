import useAxios from "./useAxios";
import { useState } from "react";

export default function useConnectBridge(url) {
  let { data, loading, error } = useAxios(url);

  if (data) {
    console.log(data);
  }

  if (!url) loading = false;

  return { data, loading, error };
}
