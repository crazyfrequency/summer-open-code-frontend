"use client"

import { useTheme } from 'next-themes';
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { Moon, Sun, SunMoon } from 'lucide-react';

export default function Themes() {
  let { theme, setTheme } = useTheme();
  return (
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">
        <Sun className="mr-2 h-4 w-4" />
        <span>Светлая</span>
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">
        <Moon className="mr-2 h-4 w-4" />
        <span>Темная</span>
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">
        <SunMoon className="mr-2 h-4 w-4" />
        <span>Системная</span>
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  )
}
