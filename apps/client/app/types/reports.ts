export type Report =
  | {
      id: string;
      name: string;
      variant: "found";
      status: "unclaimed" | "claimed";
    }
  | {
      id: string;
      name: string;
      variant: "lost";
      status: "notfound" | "found";
    };
