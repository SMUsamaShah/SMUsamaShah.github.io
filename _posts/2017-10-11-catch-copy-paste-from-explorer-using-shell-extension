---
layout: post
title: "How to get windows copy paste events with shell hook."
date: 2017-10-11
---

# How to catch copy paste from explorer using shell extension? ICopyHook alternative for files and folder

How to catch copy paste from explorer using shell extension? ICopyHook alternative for files and folder
Howto trap copy paste event from explorer to do your custom processing or even
Howto replace/substitute the copy-paste/cut-paste operation with your own copy or move or anything else?

Yes, tracking copy paste operation is possible using [DragDropHandlers](https://msdn.microsoft.com/en-us/library/bb776881(VS.85).aspx#dragdrop) i.e. just by implementing IShellExtInit & IContextMenu:

Technique in brief with code snippet:

1. Use IShellExtInit::Initialize to save the source files and destination folder – you get this data from LPCITEMIDLIST and LPDATAOBJECT in parameter to method.
2. Most important part, implement IContextMenu::QueryContextMenu to substitute default menu item for copy paste or cut paste event from explorer
3. In IContextMenu::InvokeCommand write your implementation for copy-paste/cut-paste event from explorer.

The code snippet below shows how to get source file names, destination folder name involved in copy paste operation (see TrapCopy::Initialize method below), how to direct the default copy paste event to your custom one (see TrapCopy::QueryContextMenu and TrapCopy::InvokeCommand)

```cpp
    STDMETHODIMP TrapCopy::Initialize(LPCITEMIDLIST pidlFolder,
                                      LPDATAOBJECT pDO,
                                      HKEY hProgID)
    {

        // Look for CF_HDROP data in the data object.
        // If there is no such data, return an error back to Explorer.
        FORMATETC fmt = {CF_HDROP, NULL, DVASPECT_CONTENT, -1, TYMED_HGLOBAL};
        STGMEDIUM stg = {TYMED_HGLOBAL};

        if (FAILED(pDO-&gt;GetData(&amp;fmt,&amp;stg)))
            return E_INVALIDARG;

        // Get a pointer to the actual data.
        HDROP hDrop = (HDROP)GlobalLock(stg.hGlobal);

        if (!hDrop)
            return E_INVALIDARG;

        UINT numFiles = DragQueryFile(hDrop, 0xFFFFFFFF, NULL, 0);
        if(numFiles)
        {
            WCHAR fileName[MAX_PATH] = L"";
            for(UINT i=0; i&lt;numFiles; ++i)
            {
                if(DragQueryFile(hDrop, i, fileName, MAX_PATH))
                {
                    // add file names to filename list to moved/copied
                    m_srcFileNames.Add(fileName);
                }
            }
        }

        GlobalUnlock(stg.hGlobal);
        ReleaseStgMedium(&amp;stg);

        // get destination folder:
        if (!SHGetPathFromIDList(pidlFolder, m_destFolder))
            return E_INVALIDARG;

    }

    // Code snippet for IContextMenu::QueryContextMenu
    STDMETHODIMP TrapCopy::QueryContextMenu(HMENU hmenu,
                                            UINT uMenuIndex,
                                            UINT uidFirstCmd,
                                            UINT uidLastCmd,
                                            UINT uFlags)
    {
        // If the flags include CMF_DEFAULTONLY or if pipe client
        // is not connected don't do anything.
        if (uFlags &amp; CMF_DEFAULTONLY)
            return MAKE_HRESULT(SEVERITY_SUCCESS, FACILITY_NULL, 0);

        int cmd = uidFirstCmd;

        InsertMenu(hmenu, uMenuIndex++, MF_STRING|MF_BYPOSITION, cmd ++, L"Custom copy");
        InsertMenu(hmenu, uMenuIndex++, MF_STRING|MF_BYPOSITION, cmd ++, "Custom paste");

        // set the copy/paste default handler to the menu item create above
        int defItem = GetMenuDefaultItem(hmenu, false, 0);
        if (defItem == 1) // 1: Copy
        {
            SetMenuDefaultItem(hmenu, uidFirstCmd + defItem - 1, false);      
        }
        else if (defItem == 2) // 2: Move
        {
            SetMenuDefaultItem(hmenu, uidFirstCmd + defItem - 1, false);
        }

        // Return 2 to tell the shell that we added 2 top-level menu items.
        return MAKE_HRESULT(SEVERITY_SUCCESS, FACILITY_NULL, 2);
    }

    STDMETHODIMP TrapCopy::InvokeCommand ( LPCMINVOKECOMMANDINFO pInfo )
    {
        if(HIWORD(pInfo-&gt;lpVerb))
            return E_INVALIDARG;

        // custom implementaion for copy/move for source files m_srcFileNames
        // and destination folder m_destFolder, saved in TrapCopy::Initialize

        switch(LOWORD(pInfo-&gt;lpVerb))
        {
        case 0:
            InvokeCustomCopy()
            break;

        case 1:
            InvokeCustomeMove()
            break;
        }

        return S_OK;
    }
```

---

This article was originally posted [here](http://www.mywingsoflove.com/2009/11/12/howto-handle-copy-paste-from-explorer-using-shell-extension-icopyhook-alternative/) by the author, that is [no longer available](https://web.archive.org/web/20120502020845/http://www.mywingsoflove.com/2009/11/12/howto-handle-copy-paste-from-explorer-using-shell-extension-icopyhook-alternative/).
