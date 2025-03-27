import React, { useState } from "react";
import { useChatHistoryStore, ChatHistorySummary } from "../utils/chatHistoryStore";
import { useChatStore } from "../utils/chatStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";

interface Props {
  onClose?: () => void;
}

export function ChatHistory({ onClose }: Props) {
  const { chatList, isLoading, deleteChat, updateChat } = useChatHistoryStore();
  const { loadConversation, clearMessages, chatId: currentChatId } = useChatStore();
  
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Format the date string from timestamp
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleChatSelect = async (chat: ChatHistorySummary) => {
    await loadConversation(chat.id);
    if (onClose) onClose();
  };

  const handleNewChat = () => {
    clearMessages();
    if (onClose) onClose();
  };

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this conversation?")) {
      await deleteChat(chatId);
      if (currentChatId === chatId) {
        clearMessages();
      }
    }
  };
  
  const handleEditTitle = (e: React.MouseEvent, chat: ChatHistorySummary) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setNewTitle(chat.title);
    setEditDialogOpen(true);
  };
  
  const handleSaveTitle = async () => {
    if (editingChatId && newTitle.trim()) {
      await updateChat(editingChatId, { title: newTitle.trim() });
      setEditDialogOpen(false);
      setEditingChatId(null);
      setNewTitle("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="p-3 border-b border-border">
        <Button 
          variant="default" 
          className="w-full" 
          onClick={handleNewChat}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : chatList.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No conversations yet
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`group p-2 rounded-md flex justify-between items-center cursor-pointer hover:bg-secondary transition-colors ${
                  currentChatId === chat.id ? "bg-secondary" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(chat.updated_at)} • {chat.message_count} messages
                  </p>
                </div>
                
                <div className="flex space-x-1">
                  <Tooltip>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={(e) => handleEditTitle(e, chat)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-blue-600/10 hover:text-blue-600 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      Rename conversation
                    </Tooltip.Content>
                  </Tooltip>

                  <Tooltip>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/10 hover:text-destructive transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      Delete conversation
                    </Tooltip.Content>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      
      {/* Edit Title Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <Dialog.Content className="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>Edit Conversation Title</Dialog.Title>
            <Dialog.Description>
              Give your conversation a meaningful title for easier reference later.
            </Dialog.Description>
          </Dialog.Header>
          
          <div className="py-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Conversation title"
              className="w-full"
              autoFocus
            />
          </div>
          
          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTitle}
              disabled={!newTitle.trim()}
            >
              Save Changes
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
