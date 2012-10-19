module ApplicationHelper
  def get_rated
    #@rated = Map.find_all_by_server_id(@server.id).collect{|m|{:map=>m,:count=>m.likes.count}}.sort{|a,b| b[:count] <=> a[:count]}
    Map.find_all_by_server_id(@server.id, :order => "updated_at DESC") 
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end
end
