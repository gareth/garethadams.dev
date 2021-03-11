desc "Publish a post"
task :publish do
  require "tty-prompt"
  require "date"
  require "fileutils"

  prompt = TTY::Prompt.new

  drafts_dir = Pathname.new("src/_drafts")
  posts_dir = Pathname.new("src/_posts")

  drafts = Dir[drafts_dir.join("*")]
  if drafts.empty?
    raise "No draft posts are ready to publish"
  end

  post = prompt.select("Which post?") do |menu|
    menu.default File.basename(drafts.first) if drafts.one?
    drafts.each do |d|
      menu.choice File.basename(d), d
    end
  end

  date = prompt.ask("What publication date?", convert: :date, default: Date.today.iso8601) do |q|
    q.required
  end

  pubdate = date.strftime("%Y-%m-%d")
  filename = format("%<pubdate>s-%<basename>s", pubdate: pubdate, basename: File.basename(post))
  destination = posts_dir.join(filename)

  FileUtils.mv(post, destination)
end
