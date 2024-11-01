require "import"
import "android.app.*"
import "android.os.*"
import "android.widget.*"
import "android.view.*"
import "android.graphics.PorterDuffColorFilter"
import "android.graphics.PorterDuff"
import "android.text.SpannableString"
import "android.text.style.ForegroundColorSpan"
import "android.text.Spannable"
import "android.text.Html"
import "script.manalua"
import "script.manaset"


--禁止滑动
function GamePageView()
  return luajava.override(PageView,{
    onInterceptTouchEvent=function(super,event)
      return false
    end,
    onTouchEvent=function(super,event)
      return false
    end
  })
end



import "script.manual.manuallayout"
activity.setContentView(loadlayout(manuallayout))
bookPath = activity.getLuaDir().."/script/manual/file.tsdb"
manalua.bar.color(manaset.gui.color.text_light)
manalua.bar.imm()




local manualList = {"全部", "游戏", "笔记", "基础", "实用", "网络", "文件", "界面", "布局", "其他", "Intent", "Lua"}
local manualPath = {"无", "game.tsdb", "note.tsdb", "basis.tsdb", "practical.tsdb", "network.tsdb", "file.tsdb", "interface.tsdb", "layout.tsdb", "other.tsdb", "Intent.tsdb", "lua.tsdb"}

local allString = ""
local openManual = "全部"

manual = {}
for k,y in pairs(manualList) do
  if y ~= "全部" then
    manual[y] = ""
    local filePath = activity.getLuaDir().."/script/manual/"..manualPath[k]
    if File(filePath).isFile() then
      manual[y] = tostring(io.open(filePath):read("*a"))

      --[[
      if manual[y]:find("\r\n") then
        local th = manual[y]
        io.open(filePath,"w"):write(tostring(th:gsub("\r\n", "\n"))):close()
      end
]]

      allString = allString.."\n"..manual[y]
    end
  end
end

manual["全部"] = allString




manual_edit.setUserwordColor(tointeger(manaset.editor.hlc))--用户词
manual_edit.setTextColor(tointeger(manaset.editor.tc))--文本
manual_edit.setTextHighlightColor(tointeger(manaset.editor.hlbc))--高亮(文本选择)背景
manual_edit.setStringColor(tointeger(manaset.editor.sc))--字符串
manual_edit.setPanelBackgroundColor(tointeger(manaset.editor.kbc))--补全背景
manual_edit.setPanelTextColor(tointeger(manaset.editor.kbtc))--补全文字、边框
manual_edit.setKeywordColor(tointeger(manaset.editor.fc))--关键词(function、local等)
manual_edit.setCommentColor(tointeger(manaset.editor.ac))--注释颜色
manual_edit.setBasewordColor(tointeger(manaset.editor.soc))--基本词(require、activity等)
manual_edit.setShowLineNumbers(manaset.editor.line)
manual_edit.setTextSize(manaset.editor.size)
manual_edit.setBackground(ColorDrawable(tointeger(manaset.editor.back)))
manual_edit.setTypeface(manalua.gui.font(activity.getLuaDir() .. "/res/font/code.ttf"))



--manual_edit.setShowLineNumbers(false)  --显示行号
--manual_edit.setWordWrap(true)  --自动换行
manalua.gui.ngde(manual_手册搜索,0,100,manaset.gui.color.editor, manaset.gui.color.line)

manual_手册分类文本.textColor = manaset.gui.color.text
manual_手册分类图标.ColorFilter = manaset.gui.color.icon
manual_手册数据.textColor = manaset.gui.color.text
manual_手册搜索.textColor = manaset.gui.color.text
manual_代码标题.textColor = manaset.gui.color.text
manual_手册数据.textColor = manaset.gui.color.text
manual_手册搜索.textColor = manaset.gui.color.text
manual_顶部标题.textColor = manaset.gui.color.text_light
manual_菜单图标.ColorFilter = manaset.gui.color.icon
manual_返回列表图标.ColorFilter = manaset.gui.color.icon
manual_Lua参考手册.textColor = manaset.gui.color.text

manual_底层.setBackgroundDrawable(ColorDrawable(manaset.gui.color.head));
manual_舞台.setBackgroundDrawable(ColorDrawable(manaset.gui.color.body));


manual_返回列表.onClick=function(v)
  manual_page.showPage(0)
end

local function fw(路径,内容)
  import "java.io.File"
  local f=File(tostring(File(tostring(路径)).getParentFile())).mkdirs()
  io.open(tostring(路径),"w"):write(tostring(内容)):close()
end



local idePath = Environment.getExternalStorageDirectory().toString().."/ManaLua"
local runLuaPath = idePath.."/.cache/run/manual_run.lua"
if not File(runLuaPath).isFile() then
  fw(runLuaPath,[[print("Lua运行器")]]) --初始化
end



manual_菜单.onClick=function(v)
  manalua.pop(v,"代码操作",{["运行代码"]={func=function()
        fw(runLuaPath,[[print("Lua运行器")]]) --初始化
        local runCode = manual_edit.getText()
        if runCode then
          fw(runLuaPath,runCode)
          activity.newActivity(runLuaPath)
        end
      end,num=1
    },
    ["全部复制"]={func=function()
        local runCode = manual_edit.getText()
        if runCode then
          import "android.content.*"
          activity.getSystemService(Context.CLIPBOARD_SERVICE).setText(tostring(runCode))
          manalua.tw("已复制！")
        end
      end,num=2
    },
    ["代码对齐"]={func=function()
        manual_edit.format()
        manalua.tw("完成！")
      end,num=3
    }
  })
end


manual_Lua参考手册.onClick=function(v)
  activity.newActivity("script/luadoc")
end



import "script.manual.item"
local function 手册列表(manualContent, findOutContent)
  manual_page.showPage(0)
  local findContent = tostring(findOutContent) or nil
  local bookData = {}
  local bookAdp = LuaAdapter(activity, bookData, item)
  manual_手册列表.setAdapter(bookAdp)
  bookAdp.clear()

  local manualTemp = {}
  local strlong = 0
  local 匹配字符 = "《《(.-)》》\n《《(.-)》》"
  for title,content in manualContent:gmatch(匹配字符) do
    local isV = false
    if not findContent or findContent == "nil" then
      isV = true else
      if findContent and tostring(title..content):find(findContent) then
        isV = true
      end
    end
    if isV then
      table.insert(manualTemp, content)
      strlong = strlong + 1
      bookAdp.add{
        item_图标={visibility=8},
        item_分割线={visibility=0, backgroundColor=0x229e9e9e},
        item_排头={visibility=0,text="",textColor=manaset.gui.color.text_mini},
        item_名称={text=tostring(title),textColor=manaset.gui.color.text},
        item_大小={text=tostring(strlong), visibility=8}
      }
    end
  end
  manual_手册数据.text = "已找到"..#bookData.."条数据"
  manual_手册列表.onItemClick=function(l,v,p,i)
    local codeName = tostring(bookData[i].item_名称.text) or "加载失败！"
    local codeCont = tostring(bookData[i].item_大小.text) or ""
    manual_edit.text = tostring(manualTemp[tointeger(codeCont)]) .."\n\n\n\n"
    manual_代码标题.text = codeName
    manual_page.showPage(1)
  end
end





手册列表(manual[openManual])

local puuLayout={
  LinearLayout;
  id="editor_puuLbx";
  orientation="vertical";
  layout_width="match_parent";
  layout_height="35dp";
  {
    LinearLayout;
    gravity="center";
    orientation="vertical";
    layout_width="match_parent";
    layout_height="match_parent";
    layout_marginBottom="0";
    {
      TextView;
      gravity="center";
      text="[";
      id="editor_puuBtn";
      textSize="14sp";
      textColor=manaset.gui.color.text;
      layout_width="match_parent";
      layout_height="match_parent";
    };
  };
};




manual_手册搜索.addTextChangedListener{
  onTextChanged=function(c)
    local s=tostring(c)
    if #s > 0 then
      手册列表(manual[openManual], c)
     else
      手册列表(manual[openManual])
    end
  end
}


manalua.gui.rip(manual_手册分类,0x22ffffff)
manual_手册分类.onClick=function(v)
  manalua.poplayout(v,{
    LinearLayout;
    orientation="vertical";
    layout_width="match_parent";
    layout_height="match_parent";
    gravity="bottom";
    onClick=function()
      popl.dismiss()
    end;
    {
      CardView;
      layout_marginTop="5dp";
      layout_width="match_parent";
      layout_height="wrap_content";
      radius="8dp";
      onClick="禁止点击";
      {
        LinearLayout;
        orientation="vertical";
        layout_width="match_parent";
        layout_height="match_parent";
        padding="6dp";
        backgroundColor=manaset.gui.color.body;
        {
          GridView;
          gravity="center";
          layout_height="-1";
          VerticalScrollBarEnabled=false;
          numColumns=4;
          id="cehua_left_文件菜单列表";
          layout_width="180dp";
        };
      };
    };
  }

  , function()
    local scflData = {}
    scflAdp = LuaAdapter(activity, scflData, puuLayout)
    cehua_left_文件菜单列表.setAdapter(scflAdp)

    for k,y in pairs(manualList) do
      scflAdp.add{editor_puuBtn = {text=tostring(y),textSize=14}}
    end

    cehua_left_文件菜单列表.onItemClick=function(l,v,p,i)
      local opeManualName = scflData[i].editor_puuBtn.text
      manual_手册分类文本.text = opeManualName
      openManual = opeManualName
      手册列表(manual[openManual])
      popl.dismiss()
    end

  end)
end




local codeTab = {"全选", "剪切", "复制", "粘贴", "取消"}
local codeTabData = {}
local codeTabAdp = LuaAdapter(activity,codeTabData,puuLayout)
for key,vlue in ipairs(codeTab) do
  if vlue == "取消" then
    codeTabAdp.add{editor_puuBtn = {text=vlue,textSize=12,textColor=manaset.gui.color.stray}}
   else
    codeTabAdp.add{editor_puuBtn = {text=vlue,textSize=12}}
  end
end


manual_代码编辑列表.Adapter = codeTabAdp


manual_代码编辑列表.onItemClick=function(l,v,p,i)
  local model = tostring(codeTabData[i].editor_puuBtn.text)
  if model == "全选" then
    manual_edit.selectAll()
   elseif model == "剪切" then
    manual_edit.cut()
    manual_代码编辑列表.Visibility=8
   elseif model == "复制" then
    manual_edit.copy()
    manual_代码编辑列表.Visibility=8
   elseif model == "粘贴" then
    manual_edit.paste()
    manual_代码编辑列表.Visibility=8
   elseif model == "取消" then
    manual_edit.setSelection(manual_edit.getSelectionEnd())
    manual_代码编辑列表.Visibility=8
  end
end








function PullingLayout自定义下拉布局(view,lay)
  view.getChildAt(0).getChildAt(0).removeView(view.getChildAt(0).getChildAt(0).getChildAt(0))
  view.getChildAt(0).getChildAt(0).addView(loadlayout(lay))
  view.getChildAt(2).getChildAt(0).removeView(view.getChildAt(2).getChildAt(0).getChildAt(0))
  view.getChildAt(2).getChildAt(0).addView(loadlayout(lay))
end




PullingLayout自定义下拉布局(manual_手册下拉刷新, {
  LinearLayout;
  layout_width="match_parent";
  gravity="center";
  orientation="vertical";
  layout_height="-2";
  {
    TextView;
    textSize="12sp",
    textColor=manaset.gui.color.text,
    gravity="center";
    text="由荼山提供技术支持";
    layout_width="fill";
  };
})





manual_手册下拉刷新.onRefresh=function(v)
  v.refreshFinish(0)
end




manual_edit.OnSelectionChangedListener=function(status,Start,End)
  if status then
    manual_代码编辑列表.Visibility=0
   else
    manual_代码编辑列表.Visibility=8
  end
end



nowPage = 0
manual_page.setOnPageChangeListener(PageView.OnPageChangeListener{
  onPageScrolled=function(a,b,c)
    if a==0 then
      nowPage = 0
     elseif a==1 then
      nowPage = 1
    end
  end
})




function onKeyDown(code,event)
  if string.find(tostring(event),"KEYCODE_BACK") ~= nil then
    if nowPage == 1 then
      manual_page.showPage(0)
     else
      activity.finish()
    end
    return true
  end
end





