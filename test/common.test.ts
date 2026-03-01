import { describe, expect, it } from "vitest"
import { relativeTime } from "@shared/utils"
import MockDate from "mockdate"

it("test", () => {
  //
})

describe("relativeTime language support", () => {
  it("returns Chinese strings by default", () => {
    MockDate.set(new Date("2024-01-01T12:30:00"))
    expect(relativeTime(new Date("2024-01-01T12:29:30").getTime())).toBe("刚刚")
    expect(relativeTime(new Date("2024-01-01T12:00:00").getTime())).toBe("30分钟前")
    expect(relativeTime(new Date("2024-01-01T10:00:00").getTime())).toBe("2小时前")
    expect(relativeTime(new Date("2023-12-05T10:00:00").getTime())).toBe("12月5日")
    MockDate.reset()
  })

  it("returns English strings when lang is 'en'", () => {
    MockDate.set(new Date("2024-01-01T12:30:00"))
    expect(relativeTime(new Date("2024-01-01T12:29:30").getTime(), "en")).toBe("just now")
    expect(relativeTime(new Date("2024-01-01T12:00:00").getTime(), "en")).toBe("30m ago")
    expect(relativeTime(new Date("2024-01-01T10:00:00").getTime(), "en")).toBe("2h ago")
    expect(relativeTime(new Date("2023-12-05T10:00:00").getTime(), "en")).toBe("12/5")
    MockDate.reset()
  })

  it("returns undefined for invalid timestamps", () => {
    expect(relativeTime("", "en")).toBeUndefined()
    expect(relativeTime("", "zh")).toBeUndefined()
    expect(relativeTime("invalid-date", "en")).toBeUndefined()
  })
})
