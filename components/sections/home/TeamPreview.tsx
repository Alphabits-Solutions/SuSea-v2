import Image from "next/image";
import Link from "next/link";

const TEAM = [
  {
    name: "Marcus Thorne",
    role: "Managing Partner",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCoiZ4w6GsWLQ5z2NPjK8TFIGeP82WFIoGXFcLI6x1btqdESvEIc54RYY3EmvqrhQugLGh1QpjiMCyTe8r000mAiu6e2DAgAebbZUN7VJbBPEMjzF0jLkTMqAf306AMHvI3tY8dGQI-QRuVJ5fHHcNuHg-oJE9uduubJbI0QawV45TYJ4xKGSV_Xv0c5kaJUkM9uhWL9-kvLD0H0eYIFQFTtgyT5p9UMqxNeih3P2XdJIb6dzMlun9l2FqWWEfKvoUpr4rUstrv_jP",
  },
  {
    name: "Elena Vance",
    role: "Head of Design",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUe7GQ_slxBpF3XQc4A-Isypd4sR4ZQdQ4iE27vmQYmuDBvuUIsuybEUvo76nhBv_cEPWBn4N5BkUVAplJRT7AL8-yCF82nL-_84yACf0zP1TeQdAZHmflQQywBvoReyXPWcNYSnpYOnWh68GdFnmBVouO7E6dWJ_zmTievfNUAKf70yw5NKDw-Vho_A_OXD59p0ipGOTkb5cdpTVL3DXSuu9Og1KZ-uoUYCsOC4HuYYR7w7J2KNas9EUO7bH4tp7BdN-lfhW8dy9W",
  },
  {
    name: "David Chen",
    role: "Chief Architect",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPuDr4FzcjvcCPc6IVEAPHNtBZXqxsmdt7z2_34kLUlEwbXpnvvjBak0rFAfuZf2QZKLMVgsTtQvWQZRWAJ9ox7gTYFtyyU56Nquz16G2w46vHYaG0WL_zyEEzirxBJDVk2EEQMciA3nSaTMDBAtP5J8UmMD_veHHhBbJmasnYFUpViJAvIrYk55r9mKQt0mg8REnjSzy493BTAHxtqyK3S9dwJPX8z8mRCSKJ8YUz4efcnDQJfEy9zcLpqLczoEZQXAbaQwJE5QH8",
  },
  {
    name: "Sarah Jenkins",
    role: "Ops Strategy",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5E8EQVdUWieATimj5mq1L7M_B0Yyyxo-_xPYWp8Oj8Ce-Vp3xFr4S7xAGJ0Z-fW7fIaM_XSvXbN8TVdy04VQcykzrWbn02sFQPMznMZ1xu6exqWk28sifrYItYOh01NLu4_z7BKrWXRWEi4kZ2-azxNLaNuldpnj8u_YwmrpEQEeI9y1iN-ndKrkAEYv2VgDyt5m7PhWlN0qnrXq9lP6Sb2saZXqk6E7zDJzYF3mazsb68VyGEw-whjVR_CuCJFYa8bkRYeSzsT3_",
  },
];

export default function TeamPreview() {
  return (
    <section className="py-32 px-8 bg-surface-container-low" aria-labelledby="team-preview-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-4 block">
              The Team
            </span>
            <h2 id="team-preview-heading" className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter">
              Built by Builders.
              <br />
              <span className="signature-text-gradient">For Builders.</span>
            </h2>
          </div>
          <Link
            href="/about"
            className="font-headline font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all shrink-0"
          >
            Meet the full team <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        {/* Group photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map(({ name, role, src }) => (
            <div key={name} className="group relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-surface-container relative">
                <Image
                  src={src}
                  alt={`Portrait of ${name}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-headline font-bold text-white text-sm">{name}</p>
                  <p className="text-white/70 text-xs uppercase tracking-widest">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
